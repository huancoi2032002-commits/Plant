import React from "react";
import LayoutMain from "../../layouts/LayoutMain/LayoutMain";
import PostHome from "./Components/PostHome/PostHome";
import WhyUs from "./Components/WhyUs/WhyUs";
import Connect from "./Components/Connect/Connect";
import ProductSection from "./Components/ProductSection/ProductSection";
import Banner1 from "../../assets/Banner_1.jpg";

interface HomeProps {

}

const Home: React.FC<HomeProps> = () => {
    return (
        <LayoutMain>
            <div className="pb-10 w-full">
                <div className="w-full h-auto md:mb-[36px] ">
                    <img src={Banner1} className="w-full h-[300px] object-cover" />
                </div>
                <div className="w-full flex justify-center px-4 mt-6 md:mt-10">
                    <div className="max-w-[900px] text-center">
                        <h2 className="text-[24px] md:text-[30px] font-bold mb-3 text-[#1a1a1a]">
                            🌿 MDO • Tree House
                        </h2>
                        <h3 className="text-[16px] md:text-[18px] font-medium text-[#333] mb-4">
                            Cung cấp kiểng lá cho mọi không gian sống
                        </h3>
                        <p className="text-[14px] md:text-[16px] leading-relaxed text-[#4b4b4b]">
                            MDO.Tree House là không gian dành cho những người yêu cây và muốn đưa sự xanh mát tự nhiên vào từng góc nhỏ của cuộc sống.
                            Chúng tôi chuyên cung cấp các dòng kiểng lá trang trí, cây nội thất – cây sân vườn, từ những loại dễ trồng cho người mới
                            bắt đầu đến các dòng sưu tầm cao cấp dành cho người có gu. <br /><br />
                            Chúng tôi tin rằng mỗi chiếc lá đều mang năng lượng bình yên, giúp cân bằng cảm xúc, làm dịu không gian và tạo cảm giác
                            thư giãn sau một ngày dài. Vì thế, MDO.Tree House không chỉ bán cây – chúng tôi mang đến trải nghiệm “sống cùng cây”.
                        </p>
                    </div>
                </div>

                <div className="w-full max-w-[1200px] h-full flex items-center mx-auto justify-center ">
                    <ProductSection
                        title="Sản phẩm mới"
                        products={[...productsData]
                            .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
                            .slice(0, 8)
                        }
                        limit={8}
                        type=""
                    />
                </div>
                <PostHome
                    title="MDO TREE HOUSE"
                />
                <WhyUs />
                <Connect />
            </div>

        </LayoutMain>
    );
}

export default Home;