import { useEffect, useState } from "react";
import VideoPlayer from "@/components/room/VideoPlayer";
import { FaSearch, FaTimes } from "react-icons/fa";
import { MdFullscreen } from "react-icons/md";
import VideoPlayerSearchView from "./VideoPlayerSearchView";
import { RiVideoFill } from "react-icons/ri";

interface VideoPlayerViewProps {
    room: Room;
}

export default function VideoPlayerView({ room }: VideoPlayerViewProps) {
    const [view, setView] = useState("video_player");
    const [videoId, setVideoId] = useState("");

    useEffect(() => {
        if (room.video_player) {
            const videoPlayer = room.video_player as VideoPlayer;
            setVideoId(videoPlayer.video_id);
        }
    }, [room]);

    if (view == "search") {
        return (
            <VideoPlayerSearchView selectVideo={(videoId: string) => setVideoId(videoId)} />
        )
    }

    return (
        <div className="w-full h-full flex flex-col overflow-auto">
            <div className="w-full flex items-center justify-between text-black dark:text-white py-2 px-4 border-b border-[#2a2a2a]">
                <div className="flex items-center gap-2">
                    <RiVideoFill />
                    <div>Video Player</div>
                </div>
            </div>
            <div className="w-full flex flex-col items-center overflow-auto">
                <div className="w-5/6 col-span-2 flex flex-col gap-2 py-8">
                    {videoId.length > 0 ? (
                        <>
                            <VideoPlayer videoId={videoId} room={room} />
                            <div className="w-full flex items-center justify-center gap-8">
                                <div onClick={() => setView("search")} className="w-10 h-10 bg-[#2a2a2a] rounded-full flex items-center justify-center text-xl cursor-pointer hover:bg-zinc-800"><FaSearch className="text-white" /></div>
                                <div className="w-10 h-10 bg-[#2a2a2a] rounded-full flex items-center justify-center text-xl cursor-pointer hover:bg-zinc-800"><FaTimes className="text-white" /></div>
                                <div className="w-10 h-10 bg-[#2a2a2a] rounded-full flex items-center justify-center text-xl cursor-pointer hover:bg-zinc-800"><MdFullscreen className="text-white" /></div>
                            </div>
                        </>
                    ) : (
                        <div className="w-full flex flex-col items-center text-black dark:text-white font-bold text-2xl bg-light-gray dark:bg-dark-gray-bg rounded-lg border dark:border-zinc-700 py-4">Try searching to get started</div>
                    )}
                </div>
            </div >
        </div >
    )
}