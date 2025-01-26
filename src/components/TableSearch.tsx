"use client";

import { useRouter } from "next/navigation";
import { IoIosSearch } from "react-icons/io";

const TableSearch = () => {

    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const value = (e.currentTarget[0] as HTMLInputElement).value;
        const params = new URLSearchParams(window.location.search);
        params.set("search", value);
        router.push(`${window.location.pathname}?${params.toString()}`);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="w-full md:w-auto flex items-center gap-2 text-sm rounded-md ring-1 ring-gray-300 px-2">
                <IoIosSearch className="h-5 w-5 text-gray-600" />
                <input type="text" placeholder="Search..." className="w-[200px] py-2 bg-transparent outline-none" />
            </div>
        </form>
    )
}

export default TableSearch;