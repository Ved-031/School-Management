
const Announcements = () => {
    return (
        <div className='bg-white rounded-lg p-4'>
            <div className='flex items-center justify-between'>
                <h1 className='text-lg font-semibold'>Announcements</h1>
                <span className="text-xs text-gray-400 cursor-pointer">View All</span>
            </div>
            <div className="flex flex-col gap-4 mt-4">
                <div className="bg-skyLight rounded-md p-4">
                    <div className="flex items-center justify-between">
                        <h2 className="font-medium">Lorem, ipsum dolor.</h2>
                        <span className="bg-white text-xs text-gray-400 rounded-md px-1 py-1">2025-01-01</span>
                    </div>
                    <p className="mt-1 text-gray-400 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, optio?</p>
                </div>
                <div className="bg-purpleLight rounded-md p-4">
                    <div className="flex items-center justify-between">
                        <h2 className="font-medium">Lorem, ipsum dolor.</h2>
                        <span className="bg-white text-xs text-gray-400 rounded-md px-1 py-1">2025-01-01</span>
                    </div>
                    <p className="mt-1 text-gray-400 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, optio?</p>
                </div>
                <div className="bg-yellowLight rounded-md p-4">
                    <div className="flex items-center justify-between">
                        <h2 className="font-medium">Lorem, ipsum dolor.</h2>
                        <span className="bg-white text-xs text-gray-400 rounded-md px-1 py-1">2025-01-01</span>
                    </div>
                    <p className="mt-1 text-gray-400 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, optio?</p>
                </div>
            </div>
        </div>
    )
}

export default Announcements;