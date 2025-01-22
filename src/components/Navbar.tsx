import Image from "next/image";

const Navbar = () => {
  return (
    <div className='flex items-start justify-between p-4'>
      {/* SEARCH BAR */}
      <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
        <Image src="/search.png" alt="" width={14} height={14} />
        <input type="text" placeholder="Search..." className="w-[200px] p-2 bg-transparent outline-none" />
      </div>
      {/* ICONS AND USER */}
      <div className="flex items-center gap-6 justify-end w-full">
        <div className="rounded-full flex items-center justify-center w-7 h-7 cursor-pointer">
          <Image src="/message.png" alt="" width={20} height={20} />
        </div>
        <div className="rounded-full flex items-center justify-center w-7 h-7 cursor-pointer relative">
          <Image src="/announcement.png" alt="" width={20} height={20} />
          <div className="absolute -top-2 -right-2 w-4 h-4 flex items-center justify-center text-xs text-white bg-purple-500 rounded-full">1</div>
        </div>
        <div className="flex flex-col">
          <span className="text-xs leading-3 font-medium">John Doe</span>
          <span className="text-[10px] text-right text-gray-500">Admin</span>
        </div>
        <Image src="/avatar.png" alt="" width={36} height={36} className="rounded-full" />
      </div>
    </div>
  )
}

export default Navbar;