{/*** 
import React from "react";
import type { Blog } from "../../store/Blog/Blog";

const BlogRenderer: React.FC<{ data: Blog }> = ({ data }) => {
    switch (data.layoutType) {
        // ==================== ARTICLE ====================
        case "article":
            return (
                <div className="max-w-3xl mx-auto p-6">
                    <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
                    {data.banner && (
                        <img
                            src={data.banner}
                            alt={data.title}
                            className="w-full mb-6 rounded-lg"
                        />
                    )}
                    <div
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: data.content }}
                    />
                    {data.gallery && data.gallery.length > 0 && (
                        <div className="grid grid-cols-2 gap-4 mt-6">
                            {data.gallery.map((img, i) => (
                                <img
                                    key={i}
                                    src={img}
                                    alt={`gallery-${i}`}
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                            ))}
                        </div>
                    )}
                </div>
            );

        // ==================== PROMOTION ====================
        case "promotion":
            return (
                <div className="relative text-center bg-gray-100 p-10 rounded-xl shadow-md">
                    {data.banner && (
                        <img
                            src={data.banner}
                            alt={data.title}
                            className="w-full h-80 object-cover rounded-lg mb-6"
                        />
                    )}
                    <h1 className="text-4xl font-bold text-green-700 mb-4">{data.title}</h1>
                    <p className="text-lg mb-6">{data.content}</p>
                    <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition">
                        Khám phá ngay
                    </button>
                </div>
            );

        // ==================== LISTICLE ====================
        case "listicle":
            return (
                <div className="max-w-4xl mx-auto p-6">
                    <h1 className="text-3xl font-bold mb-6">{data.title}</h1>
                    <ul className="space-y-6">
                        {data.products?.map((p, i) => (
                            <li key={i} className="flex items-center gap-4 border-b pb-4">
                                {p.images?.[0] && (
                                    <img
                                        src={p.images[0]}
                                        alt={p.name}
                                        className="w-24 h-24 object-cover rounded-lg"
                                    />
                                )}
                                <div>
                                    <h2 className="text-xl font-semibold">
                                        {i + 1}. {p.name}
                                    </h2>
                                    <p className="text-green-600 font-bold">{p.price}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            );

        // ==================== GALLERY ====================
        case "gallery":
            return (
                <div className="max-w-5xl mx-auto p-6">
                    <h1 className="text-3xl font-bold mb-6">{data.title}</h1>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {data.gallery?.map((img, i) => (
                            <img
                                key={i}
                                src={img}
                                alt={`gallery-${i}`}
                                className="w-full h-60 object-cover rounded-lg"
                            />
                        ))}
                    </div>
                </div>
            );

        // ==================== GUIDE ====================
        case "guide":
            return (
                <div className="max-w-3xl mx-auto p-6">
                    <h1 className="text-3xl font-bold mb-6">{data.title}</h1>
                    <div className="space-y-6">
                        {data.steps?.map((step, i) => (
                            <div key={i} className="p-4 border rounded-lg shadow-sm">
                                <h2 className="text-xl font-semibold mb-2">
                                    {i + 1}. {step.title}
                                </h2>
                                <p className="mb-2">{step.description}</p>
                                {step.image && (
                                    <img
                                        src={step.image}
                                        alt={step.title}
                                        className="w-full h-60 object-cover rounded-lg"
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            );

        default:
            return <p>❌ Layout chưa được hỗ trợ.</p>;
    }
};

export default BlogRenderer;*/}
