export default function RoomsListSkeleton() {
    return (
        <div className="w-full grid grid-cols-4 gap-4 gap-y-8">
            {
                Array.from({ length: 8 }).map(_ => {
                    return (
                        <div className="w-full h-full bg-gray-50 shadow dark:bg-dark-gray-bg flex flex-col items-center rounded-lg animate-pulse">
                            <div className="w-full aspect-[4/3] rounded-t-lg bg-gray-300 dark:bg-zinc-900"></div>
                            <div className="w-full flex-grow flex flex-col items-center justify-between p-4 gap-4">
                                <div className="w-full flex flex-col gap-2">
                                    <div className="w-full flex flex-col gap-1">
                                        <div className="w-fit rounded-full text-base text-gray-200 bg-gray-200 dark:text-zinc-900 dark:bg-zinc-900 font-medium overflow-hidden">{'Room Name'}</div>
                                        <div className="text-sm w-fit rounded-full overflow-hidden bg-gray-300 dark:bg-zinc-700 text-gray-300 dark:text-zinc-700">{'Room Bio'}</div>
                                    </div>
                                    <div className="w-full flex items-center flex-wrap gap-1">
                                        {
                                            // NOTE: ALLOW ONLY 5 Categories for a room
                                            Array.from({ length: 2 }).map((_, index) => {
                                                return (
                                                    <div key={index} className="text-xs bg-gray-300 dark:bg-zinc-700 dark:text-zinc-700 text-gray-300 rounded-full px-2">{"category name"}</div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <div className="w-full flex items-center justify-between">
                                    <a className="w-fit text-sm text-gray-200 font-medium  px-16 py-1 bg-gray-200 dark:bg-zinc-900 dark:text-zinc-900 text-center rounded-full duration-300 active:scale-110">Open</a>
                                    <div className="rounded-full flex items-center bg-gray-300 dark:bg-zinc-900 text-gray-300 dark:text-zinc-900 font-medium">
                                        <div className="mr-2">{10}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}