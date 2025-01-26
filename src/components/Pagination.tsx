"use client";

import { useRouter } from "next/navigation";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

import { ITEM_PER_PAGE } from "@/lib/settings";


const Pagination = ({ count, page }: { count: number, page: number }) => {

  const router = useRouter();

  const hasPrev = ITEM_PER_PAGE * (page - 1) > 0;
  const hasNext = ITEM_PER_PAGE * (page - 1) + ITEM_PER_PAGE < count;

  const changePage = (newPage: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", newPage.toString());
    router.push(`${window.location.pathname}?${params}`);
  }

  return (
    <div className='p-4 flex items-center justify-between text-gray-500 mt-3'>
        <button 
          disabled={!hasPrev} 
          onClick={() => changePage(page - 1)}
          className="px-4 text-sm rounded-md py-2 border border-gray-300 bg-gray-300/20 hover:bg-gray-300/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1"
        >
          <FaAngleLeft className="h-3 w-3" />
          Prev
        </button>
        <div className="flex items-start gap-2 text-sm">
            {Array.from(
              { length: Math.ceil(count / ITEM_PER_PAGE) },
              (_, index) => {
                const pageIndex = index + 1;
                return (
                  <button 
                    key={index} 
                    onClick={() => changePage(pageIndex)}
                    className={`w-7 rounded-md py-1 border transition-all ${pageIndex === page ? "bg-skyLight hover:bg-sky/50 border-sky" : "bg-gray-300/20 hover:bg-gray-300/50 border-gray-300"}`}
                  >
                      {pageIndex}
                  </button>
                )
              }
            )}
        </div>
        <button 
          disabled={!hasNext}
          onClick={() => changePage(page + 1)}
          className="px-4 text-sm rounded-md py-2 border border-gray-300 bg-gray-300/20 hover:bg-gray-300/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1"
        >
          Next
          <FaAngleRight className="h-3 w-3" />
        </button>
    </div>
  )
}

export default Pagination