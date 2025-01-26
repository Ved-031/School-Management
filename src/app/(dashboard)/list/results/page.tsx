import { BsSortUp } from "react-icons/bs";
import { IoFilterOutline } from "react-icons/io5";

import prisma from "@/lib/prisma";
import { role } from "@/lib/data";
import { Prisma } from "@prisma/client";
import { ITEM_PER_PAGE } from "@/lib/settings";

import Table from "@/components/Table";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import TableSearch from "@/components/TableSearch";


type ResultList = {
    id: string;
    title: string;
    studentFirstname: string;
    studentLastname: string;
    teacherFirstname: string;
    teacherLastname: string;
    score: number;
    className: string;
    startTime: Date;
    type: "Exam" | "Assignment";
};

const columns = [
    {
        header: "Title",
        accessor: "title",
        className: "hidden md:table-cell"
    },
    {
        header: "Student Name",
        accessor: "student",
    },
    {
        header: "Class",
        accessor: "class",
        className: "hidden lg:table-cell"
    },
    {
        header: "Teacher",
        accessor: "teacher",
        className: "hidden lg:table-cell"
    },
    {
        header: "Date",
        accessor: "date",
        className: "hidden lg:table-cell"
    },
    {
        header: "Type",
        accessor: "type",
        className: "hidden lg:table-cell"
    },
    {
        header: "Marks",
        accessor: "score",
    },
    {
        header: "Actions",
        accessor: "actions",
    },
];

const renderRow = (item: ResultList) => {
    return (
        <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-purpleLight">
            <td className="hidden md:table-cell">{item.title}</td>
            <td className="p-4">{item.studentFirstname + " " + item.studentLastname}</td>
            <td className="hidden lg:table-cell">{item.className}</td>
            <td className="hidden lg:table-cell">{item.teacherFirstname + " " + item.teacherLastname}</td>
            <td className="hidden lg:table-cell">{new Intl.DateTimeFormat("en-US").format(item.startTime)}</td>
            <td className="hidden lg:table-cell capitalize">{item.type}</td>
            <td className="">{item.score}</td>
            {/* ACTIONS */}
            <td>
                <div className="flex items-center gap-2">
                    {
                        role === "admin" && (
                            <>
                                <FormModal table="result" type="update" id={item.id} data={item} />
                                <FormModal table="result" type="delete" id={item.id} />
                            </>
                        )
                    }
                </div>
            </td>
        </tr>
    )
}

const ResultsListPage = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {

    const { page, ...queryParams } = searchParams;

    const p = page ? parseInt(page) : 1;

    const query: Prisma.ResultWhereInput = {};

    // URL PARAMS CONDITIONS
    if (queryParams) {
        for (const [key, value] of Object.entries(queryParams)) {
            if (value !== undefined) {
                switch (key) {
                    case "studentId":
                        query.studentId = value;
                        break;
                    case "search":
                        query.OR = [
                            { exam: { title: { contains: value, mode: "insensitive" } } },
                            { assignment: { title: { contains: value, mode: "insensitive" } } },
                            { student: { firstname: { contains: value, mode: "insensitive" } } },
                        ]
                        break;
                    default: 
                        break;
                }
            }
        }
    }

    const [dataRes, resultCount] = await prisma.$transaction([
        prisma.result.findMany({
            where: query,
            include: {
                student: {
                    select: { firstname: true, lastname: true }
                },
                exam: {
                    include: {
                        lesson: {
                            include: {
                                class: { select: { name: true } },
                                teacher: { select: { firstname: true, lastname: true } },
                            }
                        }
                    }
                },
                assignment: {
                    include: {
                        lesson: {
                            include: {
                                class: { select: { name: true } },
                                teacher: { select: { firstname: true, lastname: true } },
                            }
                        }
                    }
                },
            },
            orderBy: {
                createdAt: "desc",
            },
            take: ITEM_PER_PAGE,
            skip: ITEM_PER_PAGE * (p - 1),
        }),
        prisma.result.count({
            where: query,
        }),
    ])

    const data = dataRes.map(item => {
        const assessment = item.exam || item.assignment;
        if(!assessment) return null;
        const isExam = "startTime" in assessment;
        return {
            id: item.id,
            title: assessment.title,
            studentFirstname: item.student.firstname,
            studentLastname: item.student.lastname,
            teacherFirstname: assessment.lesson.teacher.firstname,
            teacherLastname: assessment.lesson.teacher.lastname,
            score: item.score,
            className: assessment.lesson.class.name,
            startTime: isExam ? assessment.startTime : assessment.startDate,
            type: isExam ? "Exam" : "Assignment",
        }
    })

    return (
        <div className='bg-white rounded-xl p-4 flex-1 m-4 mt-0'>
            {/* TOP */}
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold">All Results</h1>
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
                                <FormModal table="result" type="create" />
                            )
                        }
                    </div>
                </div>
            </div>
            {/* LIST */}
            <Table columns={columns} renderRow={renderRow} data={data} />
            {/* PAGINATION */}
            <Pagination count={resultCount} page={p} />
        </div>
    )
}

export default ResultsListPage;