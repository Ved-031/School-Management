import Link from "next/link";
import Image from "next/image";
import { BsSortUp } from "react-icons/bs";
import { FaRegEye } from "react-icons/fa";
import { IoFilterOutline } from "react-icons/io5";
import { role, studentsData } from "@/lib/data";

import Table from "@/components/Table";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import TableSearch from "@/components/TableSearch";


type Student = {
    id: string;
    studentId: string;
    name: string;
    email?: string;
    photo: string;
    phone?: string;
    grade: number;
    class: string;
    address: string;
}

const columns = [
    {
        header: "Info",
        accessor: "info",
    },
    {
        header: "Student ID",
        accessor: "studentId",
        className: "hidden md:table-cell",
    },
    {
        header: "Grade",
        accessor: "grade",
        className: "hidden md:table-cell",
    },
    {
        header: "Phone",
        accessor: "phone",
        className: "hidden lg:table-cell",
    },
    {
        header: "Address",
        accessor: "address",
        className: "hidden lg:table-cell",
    },
    {
        header: "Actions",
        accessor: "actions",
    },
];

const StudentsListPage = () => {

    const renderRow = (item: Student) => {
        return (
            <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-purpleLight">
                <td className="flex items-center gap-4 p-4">
                    <Image src={item.photo} alt="" width={40} height={40} className="rounded-full md:hidden xl:block w-10 h-10 object-cover" />
                    <div className="flex flex-col items-start gap-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <span className="text-sm text-gray-500">{item?.class}</span>
                    </div>
                </td>
                <td className="hidden md:table-cell">{item.studentId}</td>
                <td className="hidden md:table-cell">{item.grade}</td>
                <td className="hidden lg:table-cell">{item?.phone}</td>
                <td className="hidden lg:table-cell">{item.address}</td>
                {/* ACTIONS */}
                <td>
                    <div className="flex items-center gap-2">
                        <Link href={`/list/students/${item.id}`}>
                            <button className="border border-gray-200 bg-gray-300/20 rounded-md px-2 py-2 hover:bg-gray-300/50 transition-all text-black flex items-center justify-center">
                                <FaRegEye className="w-4 h-4" />
                            </button>
                        </Link>
                        {
                            role === "admin" && (
                                <FormModal table="student" type="delete" id={item.id} />
                            )
                        }
                    </div>
                </td>
            </tr>
        )
    }

    return (
        <div className='bg-white rounded-xl p-4 flex-1 m-4 mt-0'>
            {/* TOP */}
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold">All Students</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearch />
                    {/* BUTTONS */}
                    <div className="flex items-center gap-4 self-end">
                        <button className="border border-gray-200 bg-gray-300/20 rounded-md px-2 py-2 hover:bg-gray-300/50 transition-all text-black flex items-center justify-center">
                            <IoFilterOutline className="h-4 w-4" />
                        </button>
                        <button className="border border-gray-200 bg-gray-300/20 rounded-md px-2 py-2 hover:bg-gray-300/50 transition-all text-black flex items-center justify-center">
                            <BsSortUp className="w-4 h-4" />
                        </button>
                        {
                            role === "admin" && (
                                <FormModal table="student" type="create" />
                            )
                        }
                    </div>
                </div>
            </div>
            {/* LIST */}
            <Table columns={columns} renderRow={renderRow} data={studentsData} />
            {/* PAGINATION */}
            <Pagination />
        </div>
    )
}

export default StudentsListPage;