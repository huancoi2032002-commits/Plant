import { supabase } from "./supabase";

type DifficultyData = {
    level: number;
    scale?: number;
    description?: string;
    labels?: string[];
};

type SectionData = {
    title: string;
    type: "table" | "list" | "difficulty";
    content?: any; // table/list: array, difficulty: object
    order?: number;
};

export type PlantData = {
    plant_name: string;
    plant_secondname?: string;
    price?: string;
    height?: string;
    description?: string[];
    category?: string;
    shipping?: string;
    instock?: boolean;
    tags?: string[];
    rating?: number;
    images?: { url: string; description?: string }[];
    applications?: string[];
    sections?: SectionData[];
    created_at?: string;
};

export const createPlant = async (data: PlantData) => {
    try {
        const { data: plant, error: plantError } = await supabase
            .from("plants")
            .insert([
                {
                    plant_name: data.plant_name,
                    plant_secondname: data.plant_secondname,
                    price: data.price,
                    height: data.height,
                    description: data.description ?? null,
                    category: data.category,
                    shipping: data.shipping,
                    instock: data.instock ?? true,
                    tags: data.tags ?? null,
                    rating: data.rating ?? 0,
                },
            ])
            .select()
            .single();
        if (plantError) throw plantError;

        const plant_id = plant.plant_id;

        // ================= Images =================
        if (data.images?.length) {
            const imageRows = data.images.map((img, idx) => ({
                plant_id,
                url: img.url,
                sort_order: idx,
            }));

            await supabase.from("images").insert(imageRows);
        }

        // ================= Applications =================
        if (data.applications?.length) {
            const appRows = data.applications.map((desc: string) => ({
                plant_id,
                description: desc,
            }));

            await supabase.from("applications").insert(appRows);
        }

        // ================= Sections =================
        if (data.sections?.length) {
            for (const section of data.sections) {
                const { data: sectionData, error: sectionError } = await supabase
                    .from("sections")
                    .insert([{ plant_id, title: section.title, type: section.type, order: section.order ?? 0 }])
                    .select()
                    .single();
                if (sectionError) throw sectionError;

                const section_id = sectionData.section_id;

                //table
                if (section.type === "table" && Array.isArray(section.content)) {
                    for (const [idx, item] of section.content.entries()) {
                        await supabase.from("contents").insert([
                            {
                                section_id,
                                title: item.title ?? null,
                                label: item.label,
                                value: item.value,
                                sort_order: idx, // <-- use the index as sort_order
                            },
                        ]);
                    }
                }

                //list  
                if (section.type === "list" && Array.isArray(section.content)) {
                    for (const listBlock of section.content) {
                        const { data: contentRow } = await supabase
                            .from("contents")
                            .insert([
                                {
                                    section_id,
                                    title: listBlock.title ?? null,
                                    text: null,
                                    sort_order: listBlock.title ?? 0,
                                }
                            ])
                            .select("*")
                            .single();
                        const content_id = contentRow.content_id;

                        if (Array.isArray(listBlock.items)) {
                            for (const [idx, text] of listBlock.items.entries()) {
                                await supabase.from("items").insert([
                                    { content_id, text, sort_order: idx },
                                ]);
                            }
                        }
                    }
                }

                // Difficulty section
                if (section.type === "difficulty" && section.content) {
                    const diff: DifficultyData = section.content;

                    console.log("🔥 inserting difficulty:", diff);

                    const { error } = await supabase.from("difficulty").insert([
                        {
                            section_id,
                            level: diff.level,
                            scale: diff.scale ?? 6,
                            description: diff.description ?? null,
                            labels: diff.labels ?? [],
                            // bỏ sort_order nếu chưa có column
                        },
                    ]);

                    if (error) {
                        console.error("❌ Insert difficulty error:", error);
                    }
                }
            }
        }

        return { success: true, plant_id };
    } catch (error) {
        console.error("Add plant error:", error);
        return { success: false, error };
    }
};

{/*export const getPlantFull = async (plantId: string) => {
    // 1. plant
    const { data: plant, error: plantError } = await supabase
        .from("plants")
        .select("*")
        .eq("plant_id", plantId)
        .single();

    if (plantError) throw plantError;

    // 2. sections
    const { data: sections, error: sectionError } = await supabase
        .from("sections")
        .select("*")
        .eq("plant_id", plantId)
        .order("order", { ascending: true });

    if (sectionError) throw sectionError;


    // 4. loop sections
    const fullSections = await Promise.all(
        sections.map(async (section) => {

            // TABLE
            if (section.type === "table") {
                const { data: rows } = await supabase
                    .from("contents")
                    .select("*")
                    .eq("section_id", section.section_id)
                    .order("sort_order", { ascending: true });
                const safeRows = rows ?? [];

                return {
                    ...section,
                    content: safeRows.map(row => ({
                        title: row.title,
                        label: row.label,
                        value: row.value
                    }))
                };
            }

            // LIST
            if (section.type === "list") {
                const { data: blocks } = await supabase
                    .from("contents")
                    .select("*")
                    .eq("section_id", section.section_id)
                    .order("sort_order", { ascending: true });

                const safeBlocks = blocks ?? [];

                const content = await Promise.all(
                    safeBlocks.map(async block => {
                        const { data: items } = await supabase
                            .from("items")
                            .select("*")
                            .eq("content_id", block.content_id)
                            .order("sort_order", { ascending: true });
                        const safeItems = items ?? [];
                        return {
                            items: safeItems.map(i => i.text)
                        };
                    })
                );

                return {
                    ...section,
                    content
                };
            }

            // DIFFICULTY
            if (section.type === "difficulty") {
                const { data: diff } = await supabase
                    .from("difficulty")
                    .select("*")
                    .eq("section_id", section.section_id)
                    .maybeSingle();

                return {
                    ...section,
                    content: diff
                        ? {
                            level: diff.level,
                            scale: diff.scale,
                            description: diff.description,
                            labels: diff.labels
                        }
                        : null
                };
            }

            return section;
        })
    );

    return {
        ...plant,
        sections: fullSections
    };
};*/}

export const getPlantFull = async (plantId: string) => {
    const { data, error } = await supabase
        .from("plants")
        .select(`
            *,
            images ( url, sort_order ),
            applications ( description ),
            sections (
                *,
                contents (
                    *,
                    items (*)
                ),
                difficulty (*)
            )
        `)
        .eq("plant_id", plantId)
        .order("order", { foreignTable: "sections", ascending: true })
        .order("sort_order", { foreignTable: "sections.contents", ascending: true })
        .order("sort_order", { foreignTable: "sections.contents.items", ascending: true })
        .order("sort_order", { foreignTable: "images", ascending: true })
        .single();

    if (error) throw error;

    return transformPlant(data);
};

const transformPlant = (plant: any) => {
    return {
        ...plant,
        name: plant.plant_name,
        secondName: plant.plant_secondname,
        images: plant.images?.map((img: any) => img.url) || [],
        applications: plant.applications || [],

        sections: (plant.sections || []).map((section: any) => {

            // TABLE
            if (section.type === "table") {
                return {
                    ...section,
                    content: (section.contents || []).map((row: any) => ({
                        title: row.title,
                        label: row.label,
                        value: row.value
                    }))
                };
            }

            // LIST
            if (section.type === "list") {
                return {
                    ...section,
                    content: (section.contents || []).map((block: any) => ({
                        items: (block.items || []).map((i: any) => i.text)
                    }))
                };
            }

            // DIFFICULTY
            if (section.type === "difficulty") {
                const d = section.difficulty?.[0];

                return {
                    ...section,
                    content: d
                        ? {
                            level: d.level,
                            scale: d.scale,
                            description: d.description,
                            labels: d.labels
                        }
                        : null
                };
            }

            return section;
        })
    };
};