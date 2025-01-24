import Image from "next/image";
import { AiOutlineMessage } from "react-icons/ai";
import { IoIosSearch } from "react-icons/io";

const Navbar = () => {
  return (
    <div className='flex items-start justify-between p-4'>
      {/* SEARCH BAR */}
      <div className="hidden md:flex items-center gap-2 text-sm rounded-md ring-1 ring-gray-300 px-2 bg-white">
        {/* <Image src="/search.png" alt="" width={14} height={14} /> */}
        <IoIosSearch className="h-5 w-5 text-gray-600" />
        <input type="text" placeholder="Search..." className="w-[200px] py-2 bg-transparent outline-none" />
      </div>
      {/* ICONS AND USER */}
      <div className="flex items-center gap-6 justify-end w-full">
        {/* <div className="rounded-full flex items-center justify-center w-7 h-7 cursor-pointer">
          <Image src="/message.png" alt="" width={20} height={20} />
        </div> */}
        <AiOutlineMessage className="h-5 w-5 text-gray-600 cursor-pointer" /> 
        <div className="rounded-full flex items-center justify-center w-7 h-7 cursor-pointer relative">
          <Image src="/announcement.png" alt="" width={20} height={20} />
          <div className="absolute -top-2 -right-2 w-4 h-4 flex items-center justify-center text-xs text-white bg-purple-500 rounded-full">1</div>
        </div>
        <div className="flex flex-col">
          <span className="text-sm leading-3 font-medium">John Doe</span>
          <span className="text-[10px] text-right text-gray-500">Admin</span>
        </div>
        <Image src="/avatar.png" alt="" width={36} height={36} className="rounded-full" />
      </div>
    </div>
  )
}

export default Navbar;