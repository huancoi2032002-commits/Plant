import { useNavigate } from "react-router-dom";
import ProductItem from "../../../../components/ProductItem/ProductItem";
import type { PlantData } from "../../../../lib/plant.api";

interface ProductSectionProps {
    title: string;
    products: (PlantData & { plant_id: number })[];
    limit?: number;
    type?: string;
}

const ProductSection: React.FC<ProductSectionProps> = ({
    title,
    products,
    limit,
    type,
}) => {
    const navigate = useNavigate();

    const displayProducts = limit ? products.slice(0, limit) : products;

    return (
        <div className="w-full py-[36px]">
            <h2 className="text-2xl lg:text-[40px] font-medium mb-[30px] text-center">
                {title}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {displayProducts.map((plant) => (
                    <ProductItem
                        key={plant.plant_id}
                        plant={plant} // ✅ truyền nguyên object
                    />
                ))}
            </div>

            <div className="mt-4 flex justify-center">
                <button
                    className="py-2 px-4 bg-green-600 hover:bg-green-700 w-full max-w-[160px] text-white rounded-lg cursor-pointer"
                    onClick={() =>
                        navigate(`/products${type ? `?type=${type}` : ""}`)
                    }
                >
                    Xem thêm
                </button>
            </div>
        </div>
    );
};

export default ProductSection;