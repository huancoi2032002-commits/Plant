import { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import LayoutMain from "../../layouts/LayoutMain/LayoutMain";
import ProductItem from "../../components/ProductItem/ProductItem";
import Filter from "./Components/Filter/Filter";
import Pagination from "../../components/Pagination/Pagination";
import { supabase } from "../../lib/supabase";
import type { PlantData } from "../../lib/plant.api";
import "./Product.scss";

type Plant = PlantData & { plant_id: number };

const Product = () => {
    const [plants, setPlants] = useState<Plant[]>([]);
    const [inStockOnly, setInStockOnly] = useState(false);
    const [sortType, setSortType] = useState<string | null>(null);
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const [filterType, setFilterType] = useState<"new" | "rare" | null>(null);

    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = Number(searchParams.get("page") || 1);
    const listRef = useRef<HTMLDivElement>(null);

    // ✅ fetch data từ Supabase
    useEffect(() => {
        const fetchPlants = async () => {
            const { data, error } = await supabase
                .from("plants")
                .select(`
                *,
                images ( url ),
                applications ( description )
            `)
                .order("created_at", { ascending: false });

            if (!error && data) {
                const transformed = data.map((p: any) => ({
                    ...p,

                    // ✅ convert images từ object -> string[]
                    images: (p.images || []).map((img: any) =>
                        img.url?.replace(/[{}"]/g, "")
                    ),

                    // ✅ đảm bảo description luôn là array
                    description: p.description || [],
                }));

                setPlants(transformed); // ✅ FIX ở đây
            }
        };

        fetchPlants();
    }, []);

    // responsive
    useEffect(() => {
        const handleResize = () => {
            setItemsPerPage(window.innerWidth < 768 ? 4 : 8);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // query param filter
    useEffect(() => {
        const typeParam = searchParams.get("type");
        if (typeParam === "new" || typeParam === "rare") {
            setFilterType(typeParam);
        } else {
            setFilterType(null);
        }
    }, [searchParams]);

    // 🔍 filter
    const filteredProducts = useMemo(() => {
        return plants.filter((p) => {
            const matchStock = !inStockOnly || p.instock;

            let matchType = true;

            if (filterType === "new") {
                matchType = p.created_at
                    ? new Date(p.created_at) >=
                    new Date(new Date().setMonth(new Date().getMonth() - 1))
                    : false;
            }

            // nếu chưa có tags thì bỏ rare
            if (filterType === "rare") {
                matchType = false;
            }

            return matchStock && matchType;
        });
    }, [plants, inStockOnly, filterType]);

    // 🔢 sort
    const sortedProducts = useMemo(() => {
        const copy = [...filteredProducts];

        switch (sortType) {
            case "name-a-z":
                return copy.sort((a, b) =>
                    a.plant_name.localeCompare(b.plant_name)
                );

            case "name-z-a":
                return copy.sort((a, b) =>
                    b.plant_name.localeCompare(a.plant_name)
                );

            case "date-old-new":
                return copy.sort(
                    (a, b) =>
                        new Date(a.created_at ?? 0).getTime() -
                        new Date(b.created_at ?? 0).getTime()
                );

            case "date-new-old":
                return copy.sort(
                    (a, b) =>
                        new Date(b.created_at ?? 0).getTime() -
                        new Date(a.created_at ?? 0).getTime()
                );

            default:
                return copy;
        }
    }, [filteredProducts, sortType]);

    const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

    const currentProducts = sortedProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page: number) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("page", page.toString());
        setSearchParams(newParams);
        listRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <LayoutMain>
            <div className="w-full max-w-[1200px] mx-auto md:py-8">
                <Filter
                    onSortChange={setSortType}
                    onInStockChange={setInStockOnly}
                />

                <div
                    ref={listRef}
                    className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8"
                >
                    {currentProducts.map((plant) => (
                        <ProductItem key={plant.plant_id} plant={plant} />
                    ))}
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
            </div>
        </LayoutMain>
    );
};

export default Product;