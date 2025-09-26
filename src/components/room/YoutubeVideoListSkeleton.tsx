export default function YoutubeVideoListSkeleton() {
    return (
        <div className="w-full grid grid-cols-5 gap-4 px-8">
            {
                Array.from({ length: 20 }).map((_, index) => {
                    return (
                        <div key={index} className="w-full flex flex-col gap-2 animate-pulse">
                            <div className="w-full aspect-video bg-gray-300 rounded-lg"></div>
                            <div className="w-full bg-gray-400 text-gray-400 rounded-full overflow-hidden text-sm">Video Title</div>
                            <div className="w-full flex items-center gap-2">
                                <div className="text-gray-500 bg-gray-500 rounded-full overflow-hidden text-xs">Channel Name</div>
                                <div className="text-gray-500 bg-gray-500 rounded-full overflow-hidden text-xs">13M</div>
                                <div className="text-gray-500 bg-gray-500 rounded-full overflow-hidden text-xs">1 month ago</div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}