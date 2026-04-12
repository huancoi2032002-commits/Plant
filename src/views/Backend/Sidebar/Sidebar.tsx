import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { DashboardIcon, PlantsIcon, OrdersIcon } from "../../../assets";

type SidebarProps = {
    open: boolean;
    collapsed: boolean;
};

type SidebarItem = {
    label: string;
    href?: string;
    icon?: React.ReactNode;
    children?: SidebarItem[];
};

const sidebarItems: SidebarItem[] = [
    { label: "Dashboard", icon: <DashboardIcon className="size-6" />, href: "/admin/dashboard" },
    {
        label: "Plants",
        icon: <PlantsIcon className="size-6" />,
        children: [
            { label: "Add Plant", href: "/admin/plants/add" },
            { label: "All Plants", href: "/admin/plants/allplants" },
        ],
    },
    {
        label: "Images",
        icon: <PlantsIcon className="size-6" />,
        children: [
            { label: "Add Image", href: "/admin/plants/addimages" },
            { label: "All Images", href: "/admin/plants/allimages" },
        ],
    },
    { label: "Orders", icon: <OrdersIcon className="size-6" />, href: "/admin/orders" },
];

const Sidebar: React.FC<SidebarProps> = ({ open, collapsed}) => {
    const location = useLocation();
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    useEffect(() => {
        sidebarItems.forEach(item => {
            if (item.children?.some(child => child.href === location.pathname)) {
                setOpenDropdown(item.label);
            }
        });
    }, [location.pathname]);
    const toggleDropdown = (label: string) => {
        setOpenDropdown(openDropdown === label ? null : label);
    };

    return (
        <aside
            className={`
                fixed top-0 left-0 h-screen
                w-72 z-[60]
                bg-white
                border-r border-slate-200/50 dark:border-gray-200/30
                transition-transform duration-200 ease-linear
                ${open ? "translate-x-0" : "-translate-x-full"}
                md:translate-x-0
                md:w-${collapsed ? "16" : "72"}
            `}
        >
            <div className="p-4">
                <div className="flex items-center justify-center mb-4">
                    <h1 className="text-[20px] font-bold">Admin</h1>
                </div>
                <ul className="mt-4">
                    {sidebarItems.map((item, index) => {
                        const isActive =
                            item.href
                                ? location.pathname === item.href
                                : item.children?.some((child) => child.href === location.pathname);

                        return (
                            <li key={index} className="mb-2">
                                {item.children ? (
                                    <>
                                        {/* Parent item */}
                                        <button
                                            onClick={() => toggleDropdown(item.label)}
                                            className={`
                                                w-full flex items-center justify-between px-4 py-4 rounded hover:bg-gray-100 dark:hover:bg-[#5D87ff]/20
                                                hover:cursor-pointer
                                                ${isActive ? "bg-[#5D87ff] text-white" : ""}
                                            `}
                                        >
                                            <span className="flex items-center">
                                                {item.icon && <span className="mr-2">{item.icon}</span>}
                                                {item.label}
                                            </span>
                                            <span className={`transition-transform ${openDropdown === item.label ? "rotate-90" : ""}`}>
                                                ▶
                                            </span>
                                        </button>

                                        {/* Dropdown items */}
                                        {openDropdown === item.label && (
                                            <ul className="ml-6 mt-2 space-y-1">
                                                {item.children.map((child, idx) => {
                                                    const childActive = location.pathname === child.href;
                                                    return (
                                                        <li key={idx}>
                                                            <Link
                                                                to={child.href || "#"}
                                                                className={`
                                                                    flex items-center px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-[#5D87ff]/20
                                                                    hover:cursor-pointer
                                                                    ${childActive ? " bg-[#5D87ff]/90 text-white" : ""}
                                                                `}
                                                            >
                                                                {child.icon && <span className="mr-2">{child.icon}</span>}
                                                                {child.label}
                                                            </Link>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        )}
                                    </>
                                ) : (
                                    <Link
                                        to={item.href || "#"}
                                        className={`
                                            flex items-center px-4 py-4 rounded hover:bg-gray-100 dark:hover:bg-[#5D87ff]/20
                                            hover:cursor-pointer
                                            ${isActive ? "bg-[#5D87ff] text-white" : ""}
                                        `}
                                    >
                                        {item.icon && <span className="mr-2">{item.icon}</span>}
                                        <span className="text-[18px]">{item.label}</span>
                                    </Link>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;