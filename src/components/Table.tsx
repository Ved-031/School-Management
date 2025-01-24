
interface TableProps {
    columns: {
        header: string,
        accessor: string,
        className?: string
    }[];
    data: any[];
    renderRow: (item: any) => React.ReactNode
}

const Table = ({ columns, data, renderRow }: TableProps) => {
    return (
        <table className='w-full mt-7'>
            <thead>
                <tr className="text-left text-sm text-gray-700">
                    {
                        columns.map(col => (
                            <th key={col.accessor} className={`${col.className} font-semibold text-[15px]`}>
                                {col.header}
                            </th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                { data.map(item => renderRow(item)) }
            </tbody>
        </table>
    )
}

export default Table;