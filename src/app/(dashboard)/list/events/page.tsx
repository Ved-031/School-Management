import { BsSortUp } from "react-icons/bs";
import { IoFilterOutline } from "react-icons/io5";

import { role } from "@/lib/data";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Class, Event, Prisma } from "@prisma/client";

import Table from "@/components/Table";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import TableSearch from "@/components/TableSearch";


type EventList = Event & { class: Class }

const columns = [
    {
        header: "Event",
        accessor: "title",
    },
    {
        header: "Class",
        accessor: "class",
        className: "hidden md:table-cell"
    },
    {
        header: "Start Time",
        accessor: "startTime",
        className: "hidden lg:table-cell"
    },
    {
        header: "End Time",
        accessor: "endTime",
        className: "hidden lg:table-cell"
    },
    {
        header: "Actions",
        accessor: "actions",
    },
];

const renderRow = (item: EventList) => {
    return (
        <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-purpleLight">
            <td className="p-4">{item.title}</td>
            <td className="hidden md:table-cell">{item.class.name}</td>
            <td className="hidden lg:table-cell">{new Intl.DateTimeFormat("en-US").format(item.startDate)}</td>
            <td className="hidden lg:table-cell">{new Intl.DateTimeFormat("en-US").format(item.endDate)}</td>
            {/* ACTIONS */}
            <td>
                <div className="flex items-center gap-2">
                    {
                        role === "admin" && (
                            <>
                                <FormModal table="event" type="update" id={item.id} data={item} />
                                <FormModal table="event" type="delete" id={item.id} />
                            </>
                        )
                    }
                </div>
            </td>
        </tr>
    )
}

const EventsListPage = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {

    const { page, ...queryParams } = searchParams;

    const p = page ? parseInt(page) : 1;

    const query: Prisma.EventWhereInput = {};

    // URL PARAMS CONDITIONS
    if (queryParams) {
        for (const [key, value] of Object.entries(queryParams)) {
            if (value !== undefined) {
                switch (key) {
                    case "search":
                        query.OR = [
                            { title: { contains: value, mode: "insensitive" } },
                            { class: { name: { contains: value, mode: "insensitive" } } }
                        ]
                        break;
                    default: 
                        break;
                }
            }
        }
    }

    const [data, eventCount] = await prisma.$transaction([
        prisma.event.findMany({
            where: query,
            include: {
                class: true,
            },
            orderBy: {
                createdAt: "desc",
            },
            take: ITEM_PER_PAGE,
            skip: ITEM_PER_PAGE * (p - 1),
        }),
        prisma.event.count({
            where: query,
        }),
    ])

    return (
        <div className='bg-white rounded-xl p-4 flex-1 m-4 mt-0'>
            {/* TOP */}
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold">All Events</h1>
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
                                <FormModal table="event" type="create" />
                            )
                        }
                    </div>
                </div>
            </div>
            {/* LIST */}
            <Table columns={columns} renderRow={renderRow} data={data} />
            {/* PAGINATION */}
            <Pagination page={p} count={eventCount} />
        </div>
    )
}

export default EventsListPage;