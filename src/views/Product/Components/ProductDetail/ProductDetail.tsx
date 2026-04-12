import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LayoutMain from "../../../../layouts/LayoutMain/LayoutMain";
import { BoxIcon, CalendarIcon, LeafIcon, TreeIcon } from "../../../../assets";
import ProductItem from "../../../../components/ProductItem/ProductItem";
import PlantDescription from "../../../../components/PlantDescription/PlantDescription";


const ProductDetail = () => {
    const [product, setProduct] = useState<ProductProps | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const { idProduct } = useParams<{ idProduct: string }>();
    const [randomProducts, setRandomProducts] = React.useState<ProductProps[]>([]);
    const productDescription = idProduct ? productDescriptions[idProduct] : undefined;

    useEffect(() => {
        if (!idProduct) return;

        const foundProduct = productsData.find(p => p.id === idProduct) || null;
        setProduct(foundProduct);
    }, [idProduct])

    React.useEffect(() => {
        setRandomProducts([...productsData].sort(() => Math.random() - 0.5).slice(0, 4));
    }, []);

    if (!product) {
        return <div>Sản phẩm không tồn tại</div>;
    }

    console.log(productsData[0].images);


    return (
        <LayoutMain>
            <div className="w-full max-w-[1200px] mx-auto px-4 md:py-8">
                {/* layout sản phẩm chi tiết */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Cột trái - hình ảnh */}
                    <div>
                        <div className="mb-4">
                            <img
                                src={product.images[activeIndex]}
                                alt={`${product.name} - hình ${activeIndex + 1}`}
                                className="w-full h-auto rounded"
                            />
                        </div>
                        <div className="flex gap-2">
                            {product.images.map((img, index) => (
                                <img
                                    src={img}
                                    key={index}
                                    alt={`${product.name} thumbnail ${index + 1}`}
                                    loading="lazy"
                                    className={`w-14 h-14 object-cover rounded cursor-pointer border-2 ${index === activeIndex ? "border-green-600" : "border-gray-300"
                                        }`}
                                    onClick={() => setActiveIndex(index)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Cột phải - thông tin sản phẩm */}
                    <div className="md:px-10">
                        <h1 className="text-[22px] md:text-[28px] font-semibold truncate">
                            {product.name}
                        </h1>
                        <div className="italic">
                            <span className="text-[18px]">
                                ({product.secondName})
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
                                {product.price}
                            </span>
                        </div>

                        <div className="italic">
                            <span className="text-[18px]">
                                ({product.shipping ? product.shipping : "Chưa bao gồm chi phí vận chuyển"})
                            </span>
                        </div>

                        <div className="mt-4">
                            <span className="text-[18px] font-semibold">
                                Cao: {product.height}
                            </span>
                        </div>

                        <div className="mt-4">
                            <span className="text-[18px] font-semibold">
                                Ứng dụng:
                            </span>
                            <ul className="list-disc pl-6 space-y-1">
                                {product.applications?.map((item, index) => (
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
                    {productDescription && (
                        <PlantDescription
                            name={productDescription.name}
                            intro={productDescription.intro}
                            sections={productDescription.sections}
                            images={[]}
                        />
                    )}

                </div>
                {/* Sản phẩm liên quan */}
                <div className="mt-10">
                    <h2 className="text-xl lg:text-[28px] ">Bạn có thể quan tâm</h2>

                    {/* Mobile: flex ngang, scroll; từ md trở lên: grid */}
                    <div className="
                        flex gap-4 mt-8 overflow-x-auto 
                        sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-6 sm:overflow-x-visible
                    ">
                        {randomProducts.map((p) => (
                            <div key={p.id} className="min-w-[250px] sm:min-w-0 flex-shrink-0">
                                <ProductItem {...p} />
                            </div>
                        ))}
                    </div>
                </div>

            </div>

        </LayoutMain>
    );
}

export default ProductDetail;