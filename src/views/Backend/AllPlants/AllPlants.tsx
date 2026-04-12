import { useEffect, useState } from "react";
import { getPlantFull } from "../../../lib/plant.api";
import BackendLayout from "../../../layouts/LayoutBackend/LayoutBackend";

const AllPlants = ({ plantId }: { plantId: string }) => {
    const [plant, setPlant] = useState<any>(null);

    useEffect(() => {
        const load = async () => {
            const data = await getPlantFull(plantId);
            setPlant(data);
        };
        load();
    }, [plantId]);

    if (!plant) return <div>Loading...</div>;

    return (
        <BackendLayout title="">
            <div className="space-y-6">
                <h1 className="text-3xl font-bold">{plant.name}</h1>

                {plant.sections.map((section: any, sIdx: number) => (
                    <div key={sIdx} className="border p-4 rounded-lg">
                        <h2 className="text-xl font-semibold mb-3">
                            {section.title}
                        </h2>

                        {/* TABLE */}
                        {section.type === "table" && (
                            <div className="space-y-2">
                                {section.content.map((row: any, rIdx: number) => (
                                    <div
                                        key={rIdx}
                                        className="flex justify-between border-b pb-1"
                                    >
                                        <span className="font-medium">
                                            {row.label}
                                        </span>
                                        <span>{row.value}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* LIST */}
                        {section.type === "list" && (
                            <div className="space-y-2">
                                {section.content.map((block: any, bIdx: number) => (
                                    <ul
                                        key={bIdx}
                                        className="list-disc pl-5 space-y-1"
                                    >
                                        {block.items.map(
                                            (item: string, iIdx: number) => (
                                                <li key={iIdx}>{item}</li>
                                            )
                                        )}
                                    </ul>
                                ))}
                            </div>
                        )}

                        {/* DIFFICULTY */}
                        {section.type === "difficulty" && section.content && (
                            <div>
                                <div className="mb-2 font-medium">
                                    {section.content.description}
                                </div>

                                <div className="">
                                    <div>{section.content.level}/{section.content.scale}</div>
                                </div>

                                <div className="flex justify-between text-sm mt-2">
                                    {section.content.labels?.map(
                                        (l: string, i: number) => (
                                            <span key={i}>{l}</span>
                                        )
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </BackendLayout>
    );
};

export default AllPlants;