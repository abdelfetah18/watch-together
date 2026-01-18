import useTabs from "@/hooks/useTabs";
import RoomActions from "./RoomActions";
import { IconType } from "react-icons";
import { FaFacebookMessenger, FaSearch, FaUsers } from "react-icons/fa";
import { RiVideoFill } from "react-icons/ri";
import { useContext } from "react";
import UserContext from "@/contexts/UserContext";

interface RoomSideNavigationProps {
    room: Room;
}

type RoomView = "chat" | "video player" | "members" | "search";

const views: { name: RoomView; Icon: IconType; onlyAdmin: boolean; }[] = [
    { name: "search", Icon: FaSearch, onlyAdmin: true },
    { name: "video player", Icon: RiVideoFill, onlyAdmin: false },
    { name: "chat", Icon: FaFacebookMessenger, onlyAdmin: false },
    { name: "members", Icon: FaUsers, onlyAdmin: false },
];

export default function RoomSideNavigation({ room }: RoomSideNavigationProps) {
    const user = useContext(UserContext);
    const { activeTab, goTo } = useTabs();
    const isAdmin = user._id == (room.admin as User)._id;

    return (
        <div className="w-1/5 border-r border-[#2a2a2a]">
            <RoomActions room={room} />
            <div className="w-full h-px min-h-[1px] bg-[#2a2a2a]"></div>
            <div className="w-full flex flex-col gap-1 px-2 py-2">
                {
                    views.map((item, index) => {
                        if (item.onlyAdmin && !isAdmin) {
                            return;
                        }

                        return (
                            <div
                                key={index}
                                onClick={() => { goTo(item.name); }}
                                className={`px-2 py-2 w-full flex items-center gap-2 cursor-pointer 
                                            hover:bg-gray-200 dark:hover:bg-zinc-800 rounded-lg
                                            ${activeTab == item.name ? "bg-zinc-800 text-gray-900 dark:text-gray-50" : "dark:text-zinc-500"}`}>
                                <item.Icon />
                                <div className="capitalize">{item.name}</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
