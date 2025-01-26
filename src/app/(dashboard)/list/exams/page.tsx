import { BsSortUp } from "react-icons/bs";
import { IoFilterOutline } from "react-icons/io5";

import { role } from "@/lib/data";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Class, Exam, Prisma, Subject, Teacher } from "@prisma/client";

import Table from "@/components/Table";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import TableSearch from "@/components/TableSearch";


type ExamList = Exam & {
    lesson: {
        subject: Subject,
        class: Class,
        teacher: Teacher,
    }
} 

const columns = [
    {
        header: "Subject",
        accessor: "subject",
    },
    {
        header: "Class",
        accessor: "class",
        className: "hidden md:table-cell"
    },
    {
        header: "Teacher",
        accessor: "teacher",
        className: "hidden lg:table-cell"
    },
    {
        header: "Date",
        accessor: "date",
        className: "hidden md:table-cell"
    },
    {
        header: "Actions",
        accessor: "actions",
    },
];

const renderRow = (item: ExamList) => {
    return (
        <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-purpleLight">
            <td className="p-4">{item.lesson.subject.name}</td>
            <td className="hidden md:table-cell">{item.lesson.class.name}</td>
            <td className="hidden lg:table-cell">{item.lesson.teacher.firstname + " " + item.lesson.teacher.lastname}</td>
            <td className="hidden md:table-cell">{new Intl.DateTimeFormat("en-US").format(item.startTime)}</td>
            {/* ACTIONS */}
            <td>
                <div className="flex items-center gap-2">
                    {
                        role === "admin" && (
                            <>
                                <FormModal table="exam" type="update" id={item.id} data={item} />
                                <FormModal table="exam" type="delete" id={item.id} />
                            </>
                        )
                    }
                </div>
            </td>
        </tr>
    )
}

const ExamsListPage = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {

    const { page, ...queryParams } = searchParams;

    const p = page ? parseInt(page) : 1;

    const query: Prisma.ExamWhereInput = {};

    // URL PARAMS CONDITIONS
    if (queryParams) {
        for (const [key, value] of Object.entries(queryParams)) {
            if (value !== undefined) {
                switch (key) {
                    case "teacherId":
                        query.lesson = {
                            teacherId: value,
                        }
                        break;
                    case "classId": 
                        query.lesson = {
                            classId: value,
                        }
                        break;
                    case "search":
                        query.lesson = {
                            subject: {
                                name: { contains: value, mode: "insensitive" }
                            }
                        }
                        break;
                    default: 
                        break;
                }
            }
        }
    }

    const [data, examCount] = await prisma.$transaction([
        prisma.exam.findMany({
            where: query,
            include: {
                lesson: { 
                    select: { 
                        name: true, 
                        subject: { select: { name: true } }, 
                        class: { select: { name: true } }, 
                        teacher: { select: { firstname: true, lastname: true } } 
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
            take: ITEM_PER_PAGE,
            skip: ITEM_PER_PAGE * (p - 1),
        }),
        prisma.exam.count({
            where: query,
        }),
    ])

    return (
        <div className='bg-white rounded-xl p-4 flex-1 m-4 mt-0'>
            {/* TOP */}
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold">All Exams</h1>
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
                                <FormModal table="exam" type="create" />
                            )
                        }
                    </div>
                </div>
            </div>
            {/* LIST */}
            <Table columns={columns} renderRow={renderRow} data={data} />
            {/* PAGINATION */}
            <Pagination count={examCount} page={p} />
        </div>
    )
}

export default ExamsListPage;