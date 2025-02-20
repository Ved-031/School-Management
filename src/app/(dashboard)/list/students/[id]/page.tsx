import Link from "next/link";
import Image from "next/image";

import prisma from "@/lib/prisma";

import FormModal from "@/components/FormModal";
import BigCalendar from "@/components/BigCalendar";
import Announcements from "@/components/Announcements";
import PerformanceChart from "@/components/PerformanceChart";

const SingleStudentPage = async ({ params }: { params: { id: string } }) => {

    const student = await prisma.student.findUnique({
        where: {
            id: params.id,
        },
    })

    return (
        <div className='flex flex-col lg:flex-row gap-4 p-4'>
            {/* LEFT */}
            <div className="w-full lg:w-2/3">
                {/* TOP */}
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* USER INFO CARDS */}
                    <div className="bg-sky rounded-md px-4 py-6 flex-1 flex gap-4">
                        <div className="w-1/3">
                            <Image
                                src='https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=1200'
                                alt=""
                                width={128}
                                height={128}
                                className="object-cover w-32 h-32 rounded-full"
                            />
                        </div>
                        <div className="w-2/3 flex flex-col justify-between gap-1">
                            {/* NAME AND EDIT BTN */}
                            <div className="flex items-center justify-between">
                                <h1 className="text-lg font-semibold">Alie Summers</h1>
                                <FormModal
                                    table="student"
                                    type="update"
                                    data={{
                                        id: "1",
                                        studentId: "1234560890",
                                        username: "john-doe",
                                        firstName: "John",
                                        lastName: "Doe",
                                        email: "john@doe.com",
                                        img:
                                            "https://images.pexels.com/photos/2888150/pexels-photo-2888150.jpeg?auto=compress&cs=tinysrgb&w=1200",
                                        phone: "1234560890",
                                        grade: 5,
                                        class: "1B",
                                        address: "123 Main St, Anytown, USA",
                                        password: "1234567890",
                                        bloodType: "A+",
                                    }}
                                    className="bg-transparent border-none hover:bg-transparent"
                                />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, reprehenderit!</p>
                            <div className="flex items-center justify-between flex-wrap gap-2 text-xs font-medium mt-1">
                                <div className="flex items-center gap-2 w-full md:w-1/3 lg:w-full">
                                    <Image src='/blood.png' alt="" width={14} height={14} />
                                    <span>A+</span>
                                </div>
                                <div className="flex items-center gap-2 w-full md:w-1/3 lg:w-full">
                                    <Image src='/date.png' alt="" width={14} height={14} />
                                    <span>January 2025</span>
                                </div>
                                <div className="flex items-center gap-2 w-full md:w-1/3 lg:w-full">
                                    <Image src='/mail.png' alt="" width={14} height={14} />
                                    <span>leonard@gmail.com</span>
                                </div>
                                <div className="flex items-center gap-2 w-full md:w-1/3 lg:w-full">
                                    <Image src='/phone.png' alt="" width={14} height={14} />
                                    <span>+91 123456789</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* SMALL CARDS */}
                    <div className="flex-1 flex flex-wrap gap-4 justify-between">
                        <div className="bg-white rounded-md p-4 w-full md:w-[48%] lg:w-[47%] flex gap-4">
                            <Image src='/singleAttendance.png' alt="" width={24} height={24} className="w-6 h-6" />
                            <div className="flex flex-col items-start">
                                <h2 className="text-lg font-semibold">94%</h2>
                                <span className="text-sm text-gray-500">Attendance</span>
                            </div>
                        </div>
                        <div className="bg-white rounded-md p-4 w-full md:w-[48%] lg:w-[47%] flex gap-4">
                            <Image src='/singleBranch.png' alt="" width={24} height={24} className="w-6 h-6" />
                            <div className="flex flex-col items-start">
                                <h2 className="text-lg font-semibold">6th</h2>
                                <span className="text-sm text-gray-500">Grade</span>
                            </div>
                        </div>
                        <div className="bg-white rounded-md p-4 w-full md:w-[48%] lg:w-[47%] flex gap-4">
                            <Image src='/singleLesson.png' alt="" width={24} height={24} className="w-6 h-6" />
                            <div className="flex flex-col items-start">
                                <h2 className="text-lg font-semibold">18</h2>
                                <span className="text-sm text-gray-500">Lessons</span>
                            </div>
                        </div>
                        <div className="bg-white rounded-md p-4 w-full md:w-[48%] lg:w-[47%] flex gap-4">
                            <Image src='/singleClass.png' alt="" width={24} height={24} className="w-6 h-6" />
                            <div className="flex flex-col items-start">
                                <h2 className="text-lg font-semibold">6A</h2>
                                <span className="text-sm text-gray-500">Class Name</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* BOTTOM */}
                <div className="mt-4 bg-white rounded-md p-4 pb-5 h-[800px]">
                    <h1 className="font-medium">Student&apos;s Schedule</h1>
                    <BigCalendar />
                </div>
            </div>
            {/* RIGHT */}
            <div className="w-full lg:w-1/3 flex flex-col gap-4">
                {/* SHORTCUTS */}
                <div className="bg-white w-full rounded-md p-4">
                    <h1 className="text-lg font-semibold">Shortcuts</h1>
                    <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
                        <Link href={`/list/lessons?classId=${student?.classId}`} className="p-3 rounded-md bg-skyLight">Student&apos;s Lessons</Link>
                        <Link href={`/list/teachers?classId=${student?.classId}`} className="p-3 rounded-md bg-purpleLight">Student&apos;s Teachers</Link>
                        <Link href={`/list/exams?classId=${student?.classId}`} className="p-3 rounded-md bg-yellowLight">Student&apos;s Exams</Link>
                        <Link href={`/list/assignments?classId=${student?.classId}`} className="p-3 rounded-md bg-pink-50">Student&apos;s Assignments</Link>
                        <Link href={`/list/results?studentId=${student?.id}`} className="p-3 rounded-md bg-skyLight">Student&apos;s Results</Link>
                    </div>
                </div>
                <PerformanceChart />
                <Announcements />
            </div>
        </div>
    )
}

export default SingleStudentPage;