"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { FiPlus } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";

const TeacherForm = dynamic(() => import("@/components/forms/TeacherForm"), { 
  loading: () => <p>Loading...</p>,
  ssr: false,
});
const StudentForm = dynamic(() => import("@/components/forms/StudentForm"), { 
  loading: () => <p>Loading...</p>,
  ssr: false,
});
const ParentForm = dynamic(() => import("@/components/forms/ParentForm"), { 
  loading: () => <p>Loading...</p>,
  ssr: false,
});
const SubjectForm = dynamic(() => import("@/components/forms/SubjectForm"), { 
  loading: () => <p>Loading...</p>,
  ssr: false,
});
const ClassForm = dynamic(() => import("@/components/forms/ClassForm"), { 
  loading: () => <p>Loading...</p>,
  ssr: false,
});
const LessonForm = dynamic(() => import("@/components/forms/LessonForm"), { 
  loading: () => <p>Loading...</p>,
  ssr: false,
});
const AssignmentForm = dynamic(() => import("@/components/forms/AssignmentForm"), { 
  loading: () => <p>Loading...</p>,
  ssr: false,
});
const AnnouncementForm = dynamic(() => import("@/components/forms/AnnouncementForm"), { 
  loading: () => <p>Loading...</p>,
  ssr: false,
});
const ResultForm = dynamic(() => import("@/components/forms/ResultForm"), { 
  loading: () => <p>Loading...</p>,
  ssr: false,
});
const ExamForm = dynamic(() => import("@/components/forms/ExamForm"), { 
  loading: () => <p>Loading...</p>,
  ssr: false,
});
const EventForm = dynamic(() => import("@/components/forms/EventForm"), { 
  loading: () => <p>Loading...</p>,
  ssr: false,
});


interface FormModalProps {
  table: "teacher" | "student" | "parent" | "subject" | "class" | "lesson" | "exam" | "assignment" | "result" | "attendance" | "event" | "announcement";
  type: "create" | "update" | "delete";
  data?: any;
  id?: string;
  className?: string;
}

const forms:{[key: string]: (type: "create" | "update", data?: any) => JSX.Element} = {
  teacher: (type, data) => <TeacherForm type={type} data={data} />,
  student: (type, data) => <StudentForm type={type} data={data} />,
  parent: (type, data) => <ParentForm type={type} data={data} />,
  subject: (type, data) => <SubjectForm type={type} data={data} />,
  class: (type, data) => <ClassForm type={type} data={data} />,
  lesson: (type, data) => <LessonForm type={type} data={data} />,
  assignment: (type, data) => <AssignmentForm type={type} data={data} />,
  announcement: (type, data) => <AnnouncementForm type={type} data={data} />,
  result: (type, data) => <ResultForm type={type} data={data} />,
  exam: (type, data) => <ExamForm type={type} data={data} />,
  event: (type, data) => <EventForm type={type} data={data} />,
}

const FormModal = ({ table, type, data, id, className }: FormModalProps) => {

  const [open, setOpen] = useState(false);

  const bgColor = type === "delete" ? "bg-red-600/70 hover:bg-red-600/90" : "bg-gray-300/20 hover:bg-gray-300/50";
  const textColor = type === "delete" ? "text-white" : "text-black";
  const Icon = type === "create" ? FiPlus : type === "update" ? FaRegEdit : MdOutlineDeleteOutline;

  const handleDelete = () => {

  }

  const Form = () => {
    return type === "delete" && id ? (
        <form onSubmit={handleDelete} className="flex flex-col gap-4 p-4">
          {/* TITLE AND DESCRIPTION */}
          <div className="flex flex-col items-start gap-1">
            <h2 className="text-lg font-semibold">Are you sure?</h2>
            <p className="text-gray-500 text-sm">This action cannot be undone. This will permanently delete this {table}.</p>
          </div>
          {/* BUTTONS */}
          <div className="flex items-center gap-4 mt-3">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="border border-gray-200 px-3 font-medium py-2 transition-all flex items-center justify-center rounded-md bg-gray-300/20 hover:bg-gray-300/50 text-black"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 font-semibold tracking-wide py-2 transition-all flex items-center justify-center rounded-md bg-red-600/70 hover:bg-red-600/90 text-white"
            >
              Delete
            </button>
          </div>
        </form>
      ) : type === "create" || type === "update" ? (
        forms[table](type, data)
      ) : "Form not found!"
  }

  return (
    <>
      <button
        className={`border border-gray-200 px-2 py-2 transition-all flex items-center justify-center rounded-md ${bgColor} ${textColor} ${className}`}
        onClick={() => setOpen(true)}
      >
        <Icon className="h-4 w-4" />
      </button>
      {
        open && (
          <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg gap-5 relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] max-h-[600px] overflow-y-auto">
              <Form />
              <RxCross2 className="h-4 w-4 cursor-pointer absolute top-4 right-4" onClick={() => setOpen(false)} />
            </div>
          </div>
        )
      }
    </>
  )
}

export default FormModal;