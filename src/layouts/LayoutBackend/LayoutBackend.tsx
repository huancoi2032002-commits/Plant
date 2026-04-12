import { useState } from "react";
import { Bars } from "../../assets";
import BackendSidebar from "../../views/Backend/Sidebar/Sidebar";

type LayoutbackendProps = {
    children: React.ReactNode
    title: string
}

const BackendLayout: React.FC<LayoutbackendProps> = ({ children, title }) => {
    const [open, setOpen] = useState(false);
    const [collapsed] = useState(false);

    return (
        <div className="min-h-screen bg-white  flex">

            <BackendSidebar open={open} collapsed={collapsed}/>

            {open && (
                <div
                    className="fixed inset-0 bg-black/40 z-30 md:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            <div className="flex-1 flex flex-col md:ml-72">
                <header className="h-16 flex items-center px-4 z-10">
                    <button
                        className="md:hidden"
                        onClick={() => setOpen(true)}
                    >
                        <Bars className="size-10 z-50" />
                    </button>
                    <h1 className="text-xl font-bold ml-4 text-center w-full">{title}</h1>
                </header>
                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default BackendLayout;