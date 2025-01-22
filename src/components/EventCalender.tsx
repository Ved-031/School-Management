"use client";

import Image from 'next/image';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const events = [
    {
        id: 1, 
        title: "Lorem ipsum dolor",
        time: "12:00 PM - 2:00 PM",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elite."
    },
    {
        id: 2, 
        title: "Lorem ipsum dolor",
        time: "12:00 PM - 2:00 PM",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elite."
    },
    {
        id: 3, 
        title: "Lorem ipsum dolor",
        time: "12:00 PM - 2:00 PM",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elite."
    },
];

const EventCalender = () => {

    const [value, onChange] = useState<Value>(new Date());

    return (
        <div className='bg-white rounded-lg p-4'>
            <Calendar onChange={onChange} value={value} />
            <div className='flex items-center justify-between'>
                <h1 className='text-lg font-semibold my-4'>Events</h1>
                <Image src="/moreDark.png" alt='' width={18} height={18} className='cursor-pointer' />
            </div>
            <div className='flex flex-col gap-4'>
                {
                    events.map(event => (
                        <div key={event.id} className='px-5 py-2 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-sky even:border-t-purple'>
                            <div className='flex items-center justify-between'>
                                <h1 className='text-gray-600 font-semibold'>{event.title}</h1>
                                <span className='text-gray-300 text-xs'>{event.time}</span>
                            </div>
                            <p className='mt-1 text-gray-400 text-sm'>{event.description}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default EventCalender;