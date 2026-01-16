import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getRoomById } from "@/services/RoomService";
import {
    FaFacebookMessenger,
    FaUsers,
} from "react-icons/fa";
import { RiVideoFill } from "react-icons/ri";
import App from "@/components/Layout/App";
import VideoPlayerView from "@/components/VideoPlayerView";
import ChatView from "@/components/ChatView";
import MembersView from "@/components/MembersView";
import RoomActions from "@/components/RoomActions";
import { IconType } from "react-icons";

type RoomView = "chat" | "video player" | "members"

const views: { name: RoomView; Icon: IconType }[] = [
    { name: "members", Icon: FaUsers },
    { name: "chat", Icon: FaFacebookMessenger },
    { name: "video player", Icon: RiVideoFill },
];

export default function Room() {
    const router = useRouter();
    const [room, setRoom] = useState<Room>({
        name: "",
        bio: "",
        categories: [],
        privacy: "public",
        profile_image: null,
        total_members: 0,
    });
    const [_, setIsLoading] = useState(true);
    const [currentView, setCurrentView] = useState<RoomView>("video player");

    useEffect(() => {
        if (router.query.room_id) {
            getRoomByIdHandler();
        }
    }, [router.query]);

    async function getRoomByIdHandler(): Promise<void> {
        setIsLoading(true);
        const result = await getRoomById(router.query.room_id.toString());
        if (result.isSuccess()) {
            const room = result.value;
            setRoom(room);
        } else {

        }
        setIsLoading(false);
    }

    return (
        <App title={`room/${room._id}`}>
            <div className="w-full h-full overflow-auto flex flex-row dark:bg-zinc-950">
                <div className="w-1/5 border-r border-[#2a2a2a]">
                    <RoomActions room={room} />
                    <div className="w-full h-px min-h-[1px] bg-[#2a2a2a]"></div>
                    <div className="w-full flex flex-col gap-1 px-2 py-2">
                        {
                            views.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        onClick={() => setCurrentView(item.name)}
                                        className={`px-2 py-2 w-full flex items-center gap-2 cursor-pointer 
                                            hover:bg-gray-200 dark:hover:bg-zinc-800 rounded-lg
                                            ${currentView == item.name ? "bg-zinc-800 text-gray-900 dark:text-gray-50" : "dark:text-zinc-500"}`}>
                                        <item.Icon />
                                        <div className="capitalize">{item.name}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="flex-grow h-full dark:bg-zinc-900">
                    {currentView == "video player" && <VideoPlayerView room={room} />}
                    {currentView == "chat" && <ChatView room={room} />}
                    {currentView == "members" && <MembersView room={room} />}
                </div>
            </div>
        </App>
    )
}