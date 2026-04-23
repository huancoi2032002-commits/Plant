import type React from "react";
import { Link } from "react-router-dom";
import type { PlantData } from "../../lib/plant.api";

type ProductItemProps = {
    plant: PlantData & { plant_id: number };
};

const ProductItem: React.FC<ProductItemProps> = ({ plant }) => {
    const clean = (s?: string) =>
        s ? s.replace(/[{}"]/g, "").trim() : "";

    const getImageUrl = (img: any) => {
        if (!img) return "";

        // case 1: string
        if (typeof img === "string") {
            return img.replace(/[{}"]/g, "");
        }

        // case 2: object { url }
        if (typeof img === "object" && img.url) {
            return img.url.replace(/[{}"]/g, "");
        }

        return "";
    };
    const firstImage = getImageUrl(plant.images?.[0]);

    const shortDesc =
        plant.description?.[0]
            ? clean(plant.description[0])
            : "";

    return (
        <Link to={`/products/${plant.plant_id}`} className="w-full">
            <div className="w-full md:w-[260px] lg:w-[280px] bg-white shadow-md rounded-xl overflow-hidden flex flex-col hover:shadow-lg transition-shadow">

                <img
                    src={firstImage || "/fallback.jpg"}
                    alt={plant.plant_name}
                    className="w-full h-[200px] object-cover"
                />

                <div className="p-4 flex flex-col flex-1">
                    <p className="text-xs text-gray-500">
                        Mã: {plant.plant_id}
                    </p>

                    <h3 className="font-bold text-lg truncate">
                        {plant.plant_name}
                    </h3>

                    <p className="text-sm text-gray-600 line-clamp-2">
                        {shortDesc}
                    </p>

                    <div className="mt-2">
                        <span className="text-green-600 font-bold text-lg">
                            {plant.price || "Liên hệ"}
                        </span>
                    </div>

                    <button className="mt-3 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg">
                        Mua ngay
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default ProductItem;