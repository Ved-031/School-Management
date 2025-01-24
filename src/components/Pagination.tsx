"use client";

import { FaAngleLeft, FaAngleRight, FaChevronRight } from "react-icons/fa";

const Pagination = () => {
  return (
    <div className='p-4 flex items-center justify-between text-gray-500 mt-3'>
        <button disabled className="px-4 text-sm rounded-md py-2 border border-gray-300 bg-gray-300/20 hover:bg-gray-300/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1">
          <FaAngleLeft className="h-3 w-3" />
          Prev
        </button>
        <div className="flex items-start gap-2 text-sm">
            <button className="w-7 rounded-md py-1 border border-sky bg-skyLight hover:bg-sky/50 transition-all">1</button>
            <button className="w-7 rounded-md py-1 border border-gray-300 bg-gray-300/20 hover:bg-gray-300/50 transition-all">2</button>
            <button className="w-7 rounded-md py-1 border border-gray-300 bg-gray-300/20 hover:bg-gray-300/50 transition-all">3</button>
            ...
            <button className="w-7 rounded-md py-1 border border-gray-300 bg-gray-300/20 hover:bg-gray-300/50 transition-all">10</button>
        </div>
        <button className="px-4 text-sm rounded-md py-2 border border-gray-300 bg-gray-300/20 hover:bg-gray-300/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1">
          Next
          <FaAngleRight className="h-3 w-3" />
        </button>
    </div>
  )
}

export default Pagination