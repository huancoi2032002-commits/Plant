import React, { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import BackendLayout from "../../../layouts/LayoutBackend/LayoutBackend";
import Pagination from "../../../components/Pagination/Pagination";
import { useSearchParams } from "react-router-dom";

type ImageType = {
    id?: number;
    link?: string;
    created_at?: string;
};

const ImagesPlants: React.FC<ImageType> = () => {
    const [images, setImages] = useState<ImageType[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const currentPage = Number(searchParams.get("page") || 1);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        const { data } = await supabase
            .from("cloudinary")
            .select("*")
            .order("created_at", { ascending: false })
        setImages(data || []);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            alert("Đã sao chép link vào clipboard");
        }).catch(err => {
            console.error("Lỗi sao chép: ", err);
            alert("Sao chép thất bại");
        });
    }

    const totalPages = Math.ceil(images.length / 20);
    const paginatedImages = images.slice((currentPage - 1) * 10, currentPage * 10);
    const handlePageChange = (page: number) => {
        setSearchParams({ page: page.toString() });
    };

    return (
        <BackendLayout title="Danh sách hình ảnh">
            <div className="p-6">
                <div className="grid grid-cols-5 gap-4">
                    {paginatedImages.map(img => (
                        <div key={img.id}>
                            <img
                                src={img.link}
                                className="w-full h-80 object-cover rounded"
                            />

                            <button
                                onClick={() => copyToClipboard(img.link || "")}
                                className="px-2 py-4 text-[16px] rounded bg-[#5D87ff] hover:bg-[#5D87ff]/80 text-white mt-2 w-full cursor-pointer"

                            >
                                Copy Link
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            {totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}
        </BackendLayout>
    );
}

export default ImagesPlants;