import { BsSortUp } from "react-icons/bs";
import { IoFilterOutline } from "react-icons/io5";
import { lessonsData, role } from "@/lib/data";

import Table from "@/components/Table";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import TableSearch from "@/components/TableSearch";


type Lesson = {
    id: string;
    subject: string;
    class: number;
    teacher: number;
}

const columns = [
    {
        header: "Subject Name",
        accessor: "subject",
    },
    {
        header: "Class Name",
        accessor: "class",
        className: "hidden lg:table-cell"
    },
    {
        header: "Teacher Name",
        accessor: "teacher",
        className: "hidden md:table-cell"
    },
    {
        header: "Actions",
        accessor: "actions",
    },
];

const LessonsListPage = () => {

    const renderRow = (item: Lesson) => {
        return (
            <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-purpleLight">
                <td className="p-4">{item.subject}</td>
                <td className="hidden lg:table-cell">{item.class}</td>
                <td className="hidden md:table-cell">{item.teacher}</td>
                {/* ACTIONS */}
                <td>
                    <div className="flex items-center gap-2">
                        {
                            role === "admin" && (
                                <>
                                    <FormModal table="lesson" type="update" id={item.id} data={item} />
                                    <FormModal table="lesson" type="delete" id={item.id} />
                                </>
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
                <h1 className="hidden md:block text-lg font-semibold">All Lessons</h1>
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
                                <FormModal table="lesson" type="create" />
                            )
                        }
                    </div>
                </div>
            </div>
            {/* LIST */}
            <Table columns={columns} renderRow={renderRow} data={lessonsData} />
            {/* PAGINATION */}
            <Pagination />
        </div>
    )
}

export default LessonsListPage;