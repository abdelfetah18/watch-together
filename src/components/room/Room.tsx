import { FaUsers } from "react-icons/fa"

interface RoomProps {
    room: Room;
    joinRoom?: (room_id: string) => void;
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
        <div className="w-full h-full bg-gray-50 shadow dark:bg-dark-gray-bg flex flex-col items-center rounded-lg">
            <img className="w-full overflow-auto object-contain rounded-t-lg aspect-[4/3]" src={getImageUrl()} />
            <div className="w-full flex-grow flex flex-col items-center justify-between p-4 gap-4">
                <div className="w-full flex flex-col gap-2">
                    <div className="w-full flex flex-col">
                        <div className="text-base text-gray-900 dark:text-gray-100 font-medium">{room.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-500">{room.bio}</div>
                    </div>
                    <div className="w-full flex items-center flex-wrap gap-1">
                        {
                            // NOTE: ALLOW ONLY 5 Categories for a room
                            (room.categories as RoomCategory[]).map((category, index) => {
                                return (
                                    <div key={index} className="text-xs bg-gray-600 dark:bg-gray-600 text-indigo-50 rounded-full px-2">{category.name}</div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="w-full flex items-center justify-between">
                    {joinRoom && (<button onClick={() => { joinRoom(room._id) }} className="w-fit text-sm text-indigo-50 font-medium  px-16 py-1 bg-primary-color hover:bg-indigo-600 text-center rounded-full duration-300 active:scale-110">Join</button>)}
                    {!joinRoom && (<a href={"/room/" + room._id} className="w-fit text-sm text-indigo-50 font-medium  px-16 py-1 bg-primary-color hover:bg-indigo-600 text-center rounded-full duration-300 active:scale-110">Open</a>)}
                    <div className="flex items-center text-gray-900 dark:text-indigo-100 font-medium">
                        <div className="mr-2">{room.total_members}</div>
                        <FaUsers />
                    </div>
                </div>
            </div>
        </div>
    )
}