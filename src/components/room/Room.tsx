import { FaUsers } from "react-icons/fa"

interface RoomProps {
    room: Room,
    joinRoom?: (room_id: string) => void
};

export default function Room({ room, joinRoom }: RoomProps) {
    const getImageUrl = () => {
        if (room.profile_image) {
            if (room.profile_image.url.includes("sanity")) {
                return room.profile_image.url + "?h=300&w=400&fit=crop&crop=center";
            }
            return room.profile_image.url;
        }

        return "/profile_4_3.png";
    }

    return (
        <div className="w-11/12 h-full bg-indigo-50 shadow-lg dark:bg-gray-700 flex flex-col items-center rounded-lg">
            <img className="w-full overflow-auto object-contain rounded-t-lg" src={getImageUrl()} />
            <div className="w-full flex-grow flex flex-col items-center justify-between">
                <div className="w-11/12 flex flex-col mt-4">
                    <div className="text-base text-indigo-800 dark:text-gray-100 font-medium">{room.name || 'Name'}</div>
                    <div className="text-sm text-indigo-500 dark:text-gray-500">{room.bio || 'Bio'}</div>
                    <div className="w-full flex items-center flex-wrap my-2">
                        {
                            // NOTE: ALLOW ONLY 5 Categories for a room
                            room.categories.map((category, index) => {
                                return (
                                    <div key={index} className="text-xs bg-indigo-300 dark:bg-gray-600 text-indigo-50 rounded-full px-2 mr-1 mb-1">{category.name}</div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="w-11/12 flex items-center justify-between my-4">
                    {joinRoom && (<button onClick={() => { joinRoom(room._id) }} className="w-fit text-sm text-indigo-50 font-semibold  px-8 py-1 bg-indigo-500 hover:bg-indigo-600 text-center rounded-full">JOIN</button>)}
                    {!joinRoom && (<a href={"/room/" + room._id} className="w-fit text-sm text-indigo-50 font-semibold  px-8 py-1 bg-indigo-500 hover:bg-indigo-600 text-center rounded-full">OPEN</a>)}
                    <div className="flex items-center text-indigo-500 dark:text-indigo-100 text-lg">
                        <div className="mr-2">{room.total_members}</div>
                        <FaUsers />
                    </div>
                </div>
            </div>
        </div>
    )
}