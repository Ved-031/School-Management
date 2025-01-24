"use client";

import { BsThreeDots } from 'react-icons/bs';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Group A', value: 92, fill: "#C3EBFA" },
    { name: 'Group B', value: 8, fill: "#FAE27C" },
];

const PerformanceChart = () => {
    return (
        <div className='bg-white rounded-md p-4 h-80 relative w-full'>
            <div className='flex justify-between items-center'>
                <h1 className='text-lg font-semibold'>Performance</h1>
                <BsThreeDots className='h-5 w-5 text-black cursor-pointer' />
            </div>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        dataKey="value"
                        startAngle={180}
                        endAngle={0}
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        fill="#8884d8"
                    />
                </PieChart>
            </ResponsiveContainer>
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'>
                <h1 className='text-3xl font-bold'>9.2</h1>
                <p className='text-xs text-gray-400'>of 10 max LTS</p>
            </div>
            <h2 className='absolute font-medium bottom-16 left-0 right-0 mx-auto text-center'>1st Semeter - 2nd Semester</h2>
        </div>
    )
}

export default PerformanceChart;