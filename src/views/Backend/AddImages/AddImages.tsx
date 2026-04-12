import { useState } from "react";
import { supabase } from "../../../lib/supabase";
import imageCompression from "browser-image-compression";
import BackendLayout from "../../../layouts/LayoutBackend/LayoutBackend";

const AddImages = () => {
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const uploadToCloudinary = async (file: File) => {

        // nén ảnh trước
        const compressed = await imageCompression(file, {
            maxSizeMB: 1,
            maxWidthOrHeight: 1600,
            useWebWorker: true,
        });

        const formData = new FormData();
        formData.append("file", compressed);
        formData.append("upload_preset", "plants_unsigned");

        const res = await fetch(
            "https://api.cloudinary.com/v1_1/duxzzujph/image/upload",
            {
                method: "POST",
                body: formData
            }
        );

        const data = await res.json();
        console.log("cloudinary:", data);

        return data.secure_url;
    };

    const handleUpload = async (files: FileList | null) => {
        if (!files) return;

        setLoading(true);

        const urls: string[] = [];

        for (const file of Array.from(files)) {
            const url = await uploadToCloudinary(file);

            urls.push(url);

            // save supabase
            await supabase.from("cloudinary").insert({
                link: url
            });
        }

        setImages(prev => [...prev, ...urls]);
        setLoading(false);
    };

    return (
        <BackendLayout title="Thêm hình ảnh">
            <div className="p-6">
                <h1 className="text-xl font-bold mb-4">
                    Upload ảnh Cloudinary
                </h1>

                <input
                    type="file"
                    multiple
                    onChange={(e) => handleUpload(e.target.files)}
                />

                {loading && <p>Uploading...</p>}

                <div className="grid grid-cols-5 gap-3 mt-4">
                    {images.map((img, i) => (
                        <img
                            key={i}
                            src={img}
                            className="w-full h-32 object-cover rounded"
                        />
                    ))}
                </div>
            </div>
        </BackendLayout>
    );
};

export default AddImages;