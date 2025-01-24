"use client";

import { BsThreeDots } from "react-icons/bs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: 'Jan',
        income: 4000,
        expense: 2400,
    },
    {
        name: 'Feb',
        income: 3000,
        expense: 1398,
    },
    {
        name: 'March',
        income: 2000,
        expense: 9800,
    },
    {
        name: 'Apr',
        income: 2780,
        expense: 3908,
    },
    {
        name: 'May',
        income: 1890,
        expense: 4800,
    },
    {
        name: 'June',
        income: 2390,
        expense: 3800,
    },
    {
        name: 'July',
        income: 3490,
        expense: 4300,
    },
    {
        name: 'Aug',
        income: 3490,
        expense: 4300,
    },
    {
        name: 'Sept',
        income: 3490,
        expense: 4300,
    },
    {
        name: 'Oct',
        income: 3490,
        expense: 4300,
    },
    {
        name: 'Nov',
        income: 3490,
        expense: 4300,
    },
    {
        name: 'Dec',
        income: 3490,
        expense: 4300,
    },
];

const FinanceChart = () => {
    return (
        <div className='w-full h-full bg-white p-4 rounded-xl'>
            {/* TITLE */}
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold">Finance</h1>
                <BsThreeDots className='cursor-pointer h-6 w-6 text-black' />
            </div>
            {/* CHART */}
            <ResponsiveContainer width="100%" height="90%">
                <LineChart width={500} height={300} data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
                    <XAxis dataKey="name" axisLine={false} tick={{ fill: "#d1d5db" }} tickLine={false} tickMargin={10} />
                    <YAxis axisLine={false} tick={{ fill: "#d1d5db" }} tickLine={false} tickMargin={10} />
                    <Tooltip contentStyle={{ borderRadius: "10px", borderColor: "lightgray" }} />
                    <Legend align='center' verticalAlign='top' wrapperStyle={{ paddingTop: "10px", paddingBottom: "30px" }} />
                    <Line type="monotone" dataKey="income" stroke="#C3EBFA" strokeWidth={5} />
                    <Line type="monotone" dataKey="expense" stroke="#CFCEFF" strokeWidth={5} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default FinanceChart;