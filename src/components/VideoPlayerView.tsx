import { Dispatch, MutableRefObject, SetStateAction, useContext } from "react";
import { FaFacebookMessenger, FaTimes } from "react-icons/fa";
import { RiVideoFill } from "react-icons/ri";
import { updateVideoPlayerById } from "@/services/VideoPlayerService";
import YoutubeVideoPlayer from "./room/YoutubeVIdeoPlayer";
import useTabs from "@/hooks/useTabs";
import UserContext from "@/contexts/UserContext";

interface VideoPlayerViewProps {
    videoPlayerRef: MutableRefObject<VideoPlayerObject>;
    room: Room;
    videoId: string;
    setVideoId: Dispatch<SetStateAction<string>>;
    onReady: () => void;
    onPlay: () => void;
    onPause: () => void;
    onSync: () => void;
    timestampDiff: number;
}

export default function VideoPlayerView({ videoPlayerRef, room, videoId, setVideoId, onReady, onPlay, onPause, onSync, timestampDiff }: VideoPlayerViewProps) {
    const user = useContext(UserContext);
    const isAdmin = user._id == (room.admin as User)._id;
    const { goTo } = useTabs();

    const removeVideoPlayerHandler = async (): Promise<void> => {
        await updateVideoPlayerById(room._id, room.video_player._id, { video_id: "", is_playing: false, timestamp: 0 });
        videoPlayerRef. current.destroy();
        setVideoId("");
        goTo("search");
    }

    return (
        <div className="w-full h-full flex flex-col overflow-auto">
            <div className="w-full flex items-center justify-between text-black dark:text-white py-2 px-4 border-b border-[#2a2a2a]">
                <div className="flex items-center gap-2">
                    <RiVideoFill />
                    <div>Video Player</div>
                </div>
            </div>
            <div className="w-full flex-grow flex flex-col items-center overflow-auto">
                {
                    videoId.length == 0 ? (
                        <div className="w-full h-full flex flex-col items-center justify-center">
                            <div className="text-gray-500">
                                {isAdmin
                                    ? "No video selected. Go to Search."
                                    : "No video selected. Wait for admin."}
                            </div>
                        </div>
                    ) : (
                        <div className="w-5/6 col-span-2 flex flex-col gap-2 py-8">
                            <div className="w-full h-full flex flex-col items-center bg-black rounded-lg aspect-video">
                                <YoutubeVideoPlayer videoPlayerRef={videoPlayerRef} videoId={videoId} onReady={onReady} onPlay={onPlay} onPause={onPause} />
                            </div>
                            {
                                timestampDiff >= 3 && (
                                    <div className="flex flex-row items-center gap-2">
                                        <div className="text-sm text-red-500">{`Video is ${timestampDiff.toFixed(2)} seconds out of sync with admin.`}</div>
                                        <div onClick={onSync} className="text-sm text-blue-500 underline cursor-pointer">{"Sync now"}</div>
                                    </div>
                                )
                            }
                            <div className="w-full flex items-center justify-center gap-8">
                                <div onClick={removeVideoPlayerHandler} className="w-10 h-10 bg-[#2a2a2a] rounded-full flex items-center justify-center text-xl cursor-pointer hover:bg-zinc-800"><FaTimes className="text-white" /></div>
                                <div onClick={() => goTo("chat")} className="w-10 h-10 bg-[#2a2a2a] rounded-full flex items-center justify-center text-xl cursor-pointer hover:bg-zinc-800"><FaFacebookMessenger className="text-white" /></div>
                            </div>
                        </div>
                    )
                }
            </div >
        </div >
    )
}