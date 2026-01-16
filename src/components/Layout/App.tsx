import useRooms from "@/hooks/useRooms";
import RoomsSideBar from "@/components/RoomsSideBar";
import TopHeader from "@/components/TopHeader";
import AppLoading from "../AppLoading";
import { IconType } from "react-icons";
import { FaCog, FaCompass, FaPlus, FaSearch, FaUser } from "react-icons/fa";

interface AppProps {
    title: ScreenName;
    children: any;
}

type ScreenName =
    "profile"
    | `room/${string}`
    | "search"
    | "explore"
    | "create room"
    | "settings";

const screenIconMap: Record<ScreenName, IconType> = {
    "profile": FaUser,
    "search": FaSearch,
    "explore": FaCompass,
    "create room": FaPlus,
    "settings": FaCog,
};

export default function App({ title, children }: AppProps) {
    const { isLoading, rooms } = useRooms();

    if (isLoading) {
        return <AppLoading title="Loading..." description="Watch-Together is the ultimate platform for shared video experiences." />
    }

    const getIcon = (): IconType | undefined => {
        const icon = screenIconMap[title];
        if (!icon) {
            return undefined;
        }
        return icon;
    }

    const getTitle = (): string => {
        if (title.startsWith("room/")) {
            return rooms.find(room => room._id == title.replace("room/", ""))?.name || "room"
        }

        return title;
    }

    const getImageURL = (): string => {
        if (title.startsWith("room/")) {
            return rooms.find(room => room._id == title.replace("room/", ""))?.profile_image?.url;
        }

        return "";
    }

    return (
        <div className="w-full h-screen dark:bg-zinc-950 flex flex-row">
            <div className="flex-grow h-full flex flex-col">
                <TopHeader title={getTitle()} Icon={getIcon()} imageURL={getImageURL()} />
                <div className="w-full flex-grow flex flex-row border dark:border-[#2a2a2a] rounded-tl-lg overflow-hidden bg-zinc-900">
                    {children}
                </div>
                <RoomsSideBar title={title} rooms={rooms} />
            </div>
        </div>
    )
}