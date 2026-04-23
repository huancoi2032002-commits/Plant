import { useState } from "react";
import { createPlant } from "../../../lib/plant.api"; // đường dẫn tới createPlant
import BackendLayout from "../../../layouts/LayoutBackend/LayoutBackend";

type DifficultyType = {
    level: number;
    scale: number;
    description: string;
    labels: string[];
};
type Section =
    | { type: "table"; title: string; content: { label: string; value: string }[]; order: number }
    | { type: "list"; title: string; content: { items: string[] }[]; order: number }
    | { type: "difficulty"; title: string; content: DifficultyType; order: number };

export default function AddPlantFullForm() {
    // ===== Thông tin cơ bản =====
    const [plantName, setPlantName] = useState("");
    const [plantSecondName, setPlantSecondName] = useState("");
    const [price, setPrice] = useState("");
    const [height, setHeight] = useState("");
    const [description, setDescription] = useState<string[]>([]);
    const [category, setCategory] = useState("");
    const [shipping, setShipping] = useState("");
    const [instock] = useState(true);
    const [tags, setTags] = useState<string[]>([]);
    const [rating, setRating] = useState(0);

    // ===== Images =====
    const [images, setImages] = useState<{ url: string}[]>([]);

    // ===== Applications =====
    const [applications, setApplications] = useState<string[]>([]);

    // ===== Sections =====
    const [sections, setSections] = useState<Section[]>([]);
    const [nextOrder, setNextOrder] = useState(1);

    // ===== Add helpers =====
    const addTableSection = () => {
        setSections([
            ...sections,
            { type: "table", title: "", content: [{ label: "", value: "" }], order: nextOrder },
        ]);
        setNextOrder(nextOrder + 1);
    };

    const addListSection = () => {
        setSections([
            ...sections,
            { type: "list", title: "", content: [{ items: [""] }], order: nextOrder },
        ]);
        setNextOrder(nextOrder + 1);
    };

    const addDifficultySection = () => {
        setSections([
            ...sections,
            { type: "difficulty", title: "", content: { level: 0, scale: 6, description: "", labels: [] }, order: nextOrder },
        ]);
        setNextOrder(nextOrder + 1);
    };

    const addImage = () => setImages([...images, { url: ""}]);
    const addApplication = () => setApplications([...applications, ""]);

    // ===== Submit =====
    const handleSubmit = async () => {

        const plantData = {
            plant_name: plantName,
            plant_secondname: plantSecondName,
            price,
            height,
            description,
            category,
            shipping,
            instock,
            tags,
            rating,
            images,
            applications,
            sections,
        };

        const result = await createPlant(plantData);
        if (result.success) alert("Thêm cây thành công! Plant ID: " + result.plant_id);
        else alert("Lỗi thêm cây: " + JSON.stringify(result.error));
    };

    return (
        <BackendLayout title="Thêm Cây Mới">
            <div className="p-6 max-w-4xl mx-auto space-y-6">
                <h1 className="text-2xl font-bold mb-4">Thêm Cây Mới</h1>

                {/* ===== Thông tin cơ bản ===== */}
                <div className="grid grid-cols-2 gap-4">
                    <input
                        placeholder="Tên cây"
                        value={plantName}
                        onChange={(e) => setPlantName(e.target.value)}
                        className="border p-2"
                    />
                    <input
                        placeholder="Tên phụ"
                        value={plantSecondName}
                        onChange={(e) => setPlantSecondName(e.target.value)}
                        className="border p-2"
                    />
                    <input
                        placeholder="Giá"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="border p-2"
                    />
                    <input
                        placeholder="Chiều cao"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        className="border p-2"
                    />
                    <input
                        placeholder="Danh mục"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="border p-2"
                    />
                    <input
                        placeholder="Shipping info"
                        value={shipping}
                        onChange={(e) => setShipping(e.target.value)}
                        className="border p-2"
                    />
                    <input
                        placeholder="Rating"
                        type="number"
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        className="border p-2"
                    />
                    <input
                        placeholder="Tags (; ngăn cách)"
                        value={tags.join(";")}
                        onChange={(e) => setTags(e.target.value.split(";"))}
                        className="border p-2 col-span-2"
                    />
                    <input
                        placeholder="Description (; ngăn cách)"
                        value={description.join(";")}
                        onChange={(e) => setDescription(e.target.value.split(";"))}
                        className="border p-2 col-span-2"
                    />
                </div>

                {/* ===== Images ===== */}
                <div>
                    <h2 className="font-semibold mb-2">Images</h2>
                    {images.map((img, idx) => (
                        <div key={idx} className="flex gap-2 mb-2">
                            <input
                                placeholder="URL"
                                value={img.url}
                                onChange={(e) => {
                                    const updated = [...images];
                                    updated[idx].url = e.target.value;
                                    setImages(updated);
                                }}
                                className="border p-2 flex-1"
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    const updated = [...images];
                                    updated.splice(idx, 1);
                                    setImages(updated);
                                }}
                                className="px-3 py-1 bg-red-500 text-white rounded"
                            >
                                Xóa
                            </button>
                        </div>
                    ))}
                    <button onClick={addImage} className="bg-blue-500 text-white px-3 py-1 rounded">
                        Thêm Hình Ảnh
                    </button>
                </div>

                {/* ===== Applications ===== */}
                <div>
                    <h2 className="font-semibold mb-2">Ứng dụng:</h2>
                    {applications.map((app, idx) => (
                        <div className="flex gap-2 mb-3">
                            <input
                                key={idx}
                                placeholder="Nội dung..."
                                value={app}
                                onChange={(e) => {
                                    const updated = [...applications];
                                    updated[idx] = e.target.value;
                                    setApplications(updated);
                                }}
                                className="border p-3 w-full"
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    const updated = [...applications];
                                    updated.splice(idx, 1);
                                    setApplications(updated);
                                }}
                                className="px-3 bg-red-500 text-white rounded"
                            >
                                Xóa
                            </button>
                        </div>
                    ))}
                    <button onClick={addApplication} className="bg-blue-500 text-white px-3 py-1 rounded">
                        Thêm Ứng dụng
                    </button>
                </div>

                <div>


                    {[...sections]
                        .sort((a, b) => a.order - b.order)
                        .map((section, sIdx) => (
                            <div key={sIdx} className="border p-3 rounded mb-3 space-y-2">
                                <h2>{section.type}</h2>
                                <button
                                    type="button"
                                    onClick={() => {
                                        const u = [...sections];
                                        u.splice(sIdx, 1);
                                        setSections(u);
                                    }}
                                    className="px-3 py-1 bg-red-500 text-white rounded"
                                >
                                    Xóa section
                                </button>
                                <input
                                    placeholder="Title"
                                    value={section.title}
                                    onChange={e => {
                                        const u = [...sections];
                                        u[sIdx].title = e.target.value;
                                        setSections(u);
                                    }}
                                    className="border p-2 w-full mb-2"
                                />

                                {section.type === "table" && Array.isArray(section.content) && (
                                    <div>
                                        {section.content.map((row, rIdx) => {
                                            if (!('label' in row && 'value' in row)) return null;
                                            const tableContent = row as { label: string; value: string };

                                            return (
                                                <div key={rIdx} className="flex gap-2 mb-2">
                                                    <input
                                                        placeholder="Label"
                                                        value={tableContent.label}
                                                        onChange={e => {
                                                            const u = [...sections];
                                                            const contentArray = u[sIdx].content as { label: string; value: string }[];
                                                            contentArray[rIdx].label = e.target.value;
                                                            setSections(u);
                                                        }}
                                                        className="border p-2 flex-1"
                                                    />
                                                    <input
                                                        placeholder="Value"
                                                        value={tableContent.value}
                                                        onChange={e => {
                                                            const u = [...sections];
                                                            const contentArray = u[sIdx].content as { label: string; value: string }[];
                                                            contentArray[rIdx].value = e.target.value;
                                                            setSections(u);
                                                        }}
                                                        className="border p-2 flex-1"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const u = [...sections];
                                                            const contentArray = u[sIdx].content as { label: string; value: string }[];
                                                            contentArray.splice(rIdx, 1);
                                                            setSections(u);
                                                        }}
                                                        className="px-3 py-1 bg-red-500 text-white rounded"
                                                    >
                                                        Xóa
                                                    </button>
                                                </div>
                                            );
                                        })}

                                        <button
                                            type="button"
                                            onClick={() => {
                                                const u = [...sections];
                                                const contentArray = u[sIdx].content as { label: string; value: string }[];
                                                contentArray.push({ label: "", value: "" }); // <-- add new row
                                                setSections(u);
                                            }}
                                            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                                        >
                                            Add Row
                                        </button>
                                    </div>
                                )}

                                {section.type === "list" && Array.isArray(section.content) && (
                                    <div>
                                        {section.content.map((listItem, lIdx) => {
                                            if (!('items' in listItem && Array.isArray(listItem.items))) return null;

                                            return (
                                                <div key={lIdx} className="mb-2 space-y-1">
                                                    {listItem.items.map((item, iIdx) => (
                                                        <div key={iIdx} className="flex gap-2">
                                                            <input
                                                                key={iIdx}
                                                                placeholder="Item"
                                                                value={item}
                                                                onChange={e => {
                                                                    const u = [...sections];
                                                                    const contentArray = u[sIdx].content as { items: string[] }[];
                                                                    contentArray[lIdx].items[iIdx] = e.target.value;
                                                                    setSections(u);
                                                                }}
                                                                className="border p-2 w-full mb-1"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    const u = [...sections];
                                                                    const contentArray = u[sIdx].content as { items: string[] }[];
                                                                    contentArray[lIdx].items.splice(iIdx, 1);
                                                                    setSections(u);
                                                                }}
                                                                className="px-3 py-1 bg-red-500 text-white rounded"
                                                            >
                                                                Xóa
                                                            </button>
                                                        </div>
                                                    ))}

                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const u = [...sections];
                                                            const contentArray = u[sIdx].content as { items: string[] }[];
                                                            contentArray[lIdx].items.push(""); // <-- add new item
                                                            setSections(u);
                                                        }}
                                                        className="mt-1 px-3 py-1 bg-green-500 text-white rounded"
                                                    >
                                                        Add Item
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}

                                {section.type === "difficulty" &&
                                    'level' in section.content &&
                                    'scale' in section.content &&
                                    'description' in section.content &&
                                    'labels' in section.content && (
                                        <div>
                                            <input
                                                type="number"
                                                placeholder="Level"
                                                value={section.content.level}
                                                onChange={e => {
                                                    const u = [...sections];
                                                    (u[sIdx].content as DifficultyType).level = Number(e.target.value);
                                                    setSections(u);
                                                }}
                                                className="border p-2 mb-2 w-full"
                                            />
                                            <input
                                                type="number"
                                                placeholder="Scale"
                                                value={section.content.scale}
                                                onChange={e => {
                                                    const u = [...sections];
                                                    (u[sIdx].content as DifficultyType).scale = Number(e.target.value);
                                                    setSections(u);
                                                }}
                                                className="border p-2 mb-2 w-full"
                                            />
                                            <input
                                                placeholder="Description"
                                                value={section.content.description}
                                                onChange={e => {
                                                    const u = [...sections];
                                                    (u[sIdx].content as DifficultyType).description = e.target.value;
                                                    setSections(u);
                                                }}
                                                className="border p-2 mb-2 w-full"
                                            />
                                            {(section.content.labels as string[]).map((label, idx) => (
                                                <input
                                                    key={idx}
                                                    placeholder="Label"
                                                    value={label}
                                                    onChange={e => {
                                                        const u = [...sections];
                                                        (u[sIdx].content as DifficultyType).labels[idx] = e.target.value;
                                                        setSections(u);
                                                    }}
                                                    className="border p-2 mb-1 w-full"
                                                />
                                            ))}
                                        </div>
                                    )}
                            </div>
                        ))}
                    <div className="flex gap-2">
                        <button onClick={addTableSection} className="bg-blue-500 text-white px-3 py-1 rounded">Thêm Table</button>
                        <button onClick={addListSection} className="bg-blue-500 text-white px-3 py-1 rounded">Thêm List</button>
                        <button onClick={addDifficultySection} className="bg-blue-500 text-white px-3 py-1 rounded">Thêm Difficulty</button>
                    </div>
                </div>
                {/* ===== Submit ===== */}
                <button
                    onClick={handleSubmit}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    Thêm cây
                </button>
            </div>
        </BackendLayout>
    );
}