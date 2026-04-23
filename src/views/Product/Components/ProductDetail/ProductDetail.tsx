import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LayoutMain from "../../../../layouts/LayoutMain/LayoutMain";
import { BoxIcon, CalendarIcon, LeafIcon, TreeIcon } from "../../../../assets";
import PlantDescription from "../../../../components/PlantDescription/PlantDescription";
import { getPlantFull } from "../../../../lib/plant.api";


const ProductDetail = () => {
    const [plant, setPlant] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const { idProduct } = useParams<{ idProduct: string }>();
    const [productDescription, setProductDescription] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getPlantFull(idProduct!);
                setPlant(data);
                setProductDescription(data);
            } catch (error) {
                console.error("Error fetching plant data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [idProduct]);

    if (loading) {
        return <div className="text-center text-lg">Loading...</div>;
    }
    const images = plant.images
        ?.map((url: string) =>
            url.replace(/[{}]/g, "")
        )
        .filter(Boolean) || [];

    const applications = plant.applications
    ?.map((app: any) =>
        app.description
            ?.replace(/^{|}$/g, "")  // bỏ { }
            .replace(/^"|"$/g, "")  // bỏ " ở đầu/cuối
            .trim()
    )
    .filter(Boolean) || [];

    return (
        <LayoutMain>
            <div className="w-full max-w-[1200px] mx-auto px-4 md:py-8">
                {/* layout sản phẩm chi tiết */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Cột trái - hình ảnh */}
                    {images.length > 0 && (
                        <div>
                            <div className="mb-4">
                                <img
                                    src={images[activeIndex]}
                                    className="w-full h-auto rounded"
                                />
                            </div>

                            <div className="flex gap-2">
                                {images.map((img: string, index: number) => (
                                    <img
                                        src={img}
                                        key={index}
                                        className={`w-14 h-14 object-cover rounded cursor-pointer border-2 ${index === activeIndex
                                            ? "border-green-600"
                                            : "border-gray-300"
                                            }`}
                                        onClick={() => setActiveIndex(index)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Cột phải - thông tin sản phẩm */}
                    <div className="md:px-10">
                        <h1 className="text-[22px] md:text-[28px] font-semibold truncate">
                            {plant.name}
                        </h1>
                        <div className="italic">
                            <span className="text-[18px]">
                                ({plant.secondName})
                            </span>
                        </div>

                        <ul className="text-[#212326B3] text-[16px] md:text-[18px] mt-4 space-y-2">
                            <li className="flex items-center gap-2">
                                <LeafIcon />
                                <p>Chăm sóc bởi những người nông dân với nhiều năm kinh nghiệm</p>
                            </li>
                            <li className="flex items-center gap-2">
                                <BoxIcon />
                                <p>Từ vườn ươm trực tiếp đến tận tay bạn</p>
                            </li>
                            <li className="flex items-center gap-2">
                                <CalendarIcon />
                                <p>Mỗi cây đều đảm bảo không sâu bệnh</p>
                            </li>
                            <li className="flex items-center gap-2">
                                <TreeIcon />
                                <p>Kích thước và màu sắc của cây gửi đi giống như trong hình</p>
                            </li>
                        </ul>

                        <div className="mt-4">
                            <span className="text-[18px] font-semibold">
                                {plant.price}
                            </span>
                        </div>

                        <div className="italic">
                            <span className="text-[18px]">
                                ({plant.shipping ? plant.shipping : "Chưa bao gồm chi phí vận chuyển"})
                            </span>
                        </div>

                        <div className="mt-4">
                            <span className="text-[18px] font-semibold">
                                Cao: {plant.height}
                            </span>
                        </div>

                        <div className="mt-4">
                            <span className="text-[18px] font-semibold">
                                Ứng dụng:
                            </span>
                            <ul className="list-disc pl-6 space-y-1">
                                {applications?.map((item: string, index: number) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex flex-col gap-2 mt-4">
                            <Link to="https://www.facebook.com/ucnguyen.337352" target="_blank" rel="noopener noreferrer">
                                <button className="bg-[#5433EB] h-[50px] w-full text-lg text-white cursor-pointer hover:bg-[#5433EB]/90">
                                    Liên hệ Facebook
                                </button>
                            </Link>
                            <Link to="https://zalo.me/0817913888 " target="_blank" rel="noopener noreferrer">
                                <button className="bg-[#5433EB] h-[50px] w-full text-lg text-white cursor-pointer hover:bg-[#5433EB]/90">
                                    Liên hệ Zalo
                                </button>
                            </Link>
                            <Link to="https://www.tiktok.com/@mdo_treehouse" target="_blank" rel="noopener noreferrer">
                                <button className="bg-[#5433EB] h-[50px] w-full text-lg text-white cursor-pointer hover:bg-[#5433EB]/90">
                                    Liên hệ TikTok
                                </button>
                            </Link>
                        </div>

                        <div className="py-4">
                            <ul className="list-decimal list-inside space-y-2 text-gray-700">
                                <li>Hình ảnh chỉ mang tính minh họa, cây gửi đi sẽ giống hoặc tương tự như trong hình</li>
                                <li>Có thể lớn hơn hoặc nhỏ hơn tùy theo lô hàng hiện có</li>
                                <li>Hàng có thể hết bất ngờ</li>
                            </ul>
                        </div>

                    </div>
                </div>
                <div className="w-full">
                    {PlantDescription && (
                        <PlantDescription plant={productDescription} />
                    )}
                </div>
                {/* Sản phẩm liên quan */}


            </div>

        </LayoutMain>
    );
}

export default ProductDetail;