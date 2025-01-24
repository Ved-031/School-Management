import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalendar";
import EventCalender from "@/components/EventCalender";

const StudentsPage = () => {
  return (
    <div className='p-4 flex gap-4 flex-col xl:flex-row'>
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="h-screen bg-white p-4 pb-10 rounded-lg">
          <h1 className="text-xl font-semibold">Schedule (4A)</h1>
          <div className="h-full">
            <BigCalendar />
          </div>
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <EventCalender />
        <Announcements />
      </div>
    </div>
  )
}

export default StudentsPage;