"use client";

import Image from "next/image";
import { CiSearch } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";

const TableSearch = () => {
    return (
        <div className="w-full md:w-auto flex items-center gap-2 text-sm rounded-md ring-1 ring-gray-300 px-2">
            {/* <Image src="/search.png" alt="" width={14} height={14} /> */}
            <IoIosSearch className="h-5 w-5 text-gray-600" />
            <input type="text" placeholder="Search..." className="w-[200px] py-2 bg-transparent outline-none" />
        </div>
    )
}

export default TableSearch;