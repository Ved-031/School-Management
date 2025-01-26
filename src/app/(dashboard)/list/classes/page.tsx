import { BsSortUp } from "react-icons/bs";
import { IoFilterOutline } from "react-icons/io5";

import prisma from "@/lib/prisma";
import { getRole } from "@/lib/utils";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Class, Prisma, Teacher } from "@prisma/client";

import Table from "@/components/Table";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import TableSearch from "@/components/TableSearch";


type ClassList = Class & { supervisior: Teacher }


const ClassesListPage = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {

    const role = await getRole();
    
    const columns = [
        {
            header: "Class Name",
            accessor: "name",
        },
        {
            header: "Capacity",
            accessor: "capacity",
            className: "hidden lg:table-cell"
        },
        {
            header: "Grade",
            accessor: "grade",
            className: "hidden md:table-cell"
        },
        {
            header: "Supervisor",
            accessor: "supervisor",
            className: "hidden lg:table-cell"
        },
        {
            header: "Actions",
            accessor: "actions",
        },
    ];
    
    const renderRow = (item: ClassList) => {
        return (
            <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-purpleLight">
                <td className="p-4">{item.name}</td>
                <td className="hidden lg:table-cell">{item.capacity}</td>
                <td className="hidden md:table-cell">{item.name[0]}</td>
                <td className="hidden lg:table-cell">{item.supervisior.firstname + " " + item.supervisior.lastname}</td>
                {/* ACTIONS */}
                <td>
                    <div className="flex items-center gap-2">
                        {
                            role === "admin" && (
                                <>
                                    <FormModal table="class" type="update" id={item.id} data={item} />
                                    <FormModal table="class" type="delete" id={item.id} />
                                </>
                            )
                        }
                    </div>
                </td>
            </tr>
        )
    }

    const { page, ...queryParams } = searchParams;

    const p = page ? parseInt(page) : 1;
    const query: Prisma.ClassWhereInput = {};

    // URL PARAMS CONDITIONS
    if (queryParams) {
        for (const [key, value] of Object.entries(queryParams)) {
            if (value !== undefined) {
                switch (key) {
                    case "supervisorId":
                        query.supervisiorId = value;
                        break;
                    case "search":
                        query.name = {
                            contains: value,
                            mode: "insensitive",
                        }
                        break;
                    default: 
                        break;
                }
            }
        }
    }

    const [data, classCount] = await prisma.$transaction([
        prisma.class.findMany({
            where: query,
            include: {
                grade: true,
                supervisior: true,
            },
            orderBy: {
                createdAt: "desc",
            },
            take: ITEM_PER_PAGE,
            skip: ITEM_PER_PAGE * (p - 1),
        }),
        prisma.class.count({
            where: query,
        }),
    ])

    return (
        <div className='bg-white rounded-xl p-4 flex-1 m-4 mt-0'>
            {/* TOP */}
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold">All Classes</h1>
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
                                <FormModal table="class" type="create" />
                            )
                        }
                    </div>
                </div>
            </div>
            {/* LIST */}
            <Table columns={columns} renderRow={renderRow} data={data} />
            {/* PAGINATION */}
            <Pagination page={p} count={classCount} />
        </div>
    )
}

export default ClassesListPage;