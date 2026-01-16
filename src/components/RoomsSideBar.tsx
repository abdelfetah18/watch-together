import Link from "next/link";

interface RoomsSideBarProps {
    title: string;
    rooms: Room[];
}

export default function RoomsSideBar({ title, rooms }: RoomsSideBarProps) {
    return (
        <div className="w-full flex flex-row items-center px-4 gap-4">
            <Link href={"/explore"}>
                <img className="w-10 aspect-square object-contain" src="/logo.png" alt="logo" />
            </Link>
            <div className="min-h-[1px] h-10 w-px bg-[#2a2a2a]"></div>
            <div className="w-full flex flex-row flex-wrap items-center gap-4">
                {
                    rooms.map((room, index) => {
                        const getImageUrl = () => {
                            if (room.profile_image) {
                                if (room.profile_image.url.includes("sanity")) {
                                    return room.profile_image.url + "?h=400&w=400&fit=crop&crop=center";
                                }
                                return room.profile_image.url;
                            }

                            return "/profile_4_3.png";
                        }

                        const isSelected = (): boolean => {
                            if (title.startsWith("room/")) {
                                return title.replace("room/", "") == room._id;
                            }
                            return false;
                        }

                        return (
                            <Link key={index} href={`/room/${room._id}`} className={"relative w-10 py-4 flex flex-col items-center justify-center"}>
                                {isSelected() && (<div className="absolute bottom-0 w-full h-1 rounded-t-full bg-gray-50"></div>)}
                                <img className="w-10 aspect-square rounded-lg object-cover" src={getImageUrl()} />
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}