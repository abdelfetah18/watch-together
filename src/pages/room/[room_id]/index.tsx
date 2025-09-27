import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { getRoomById, searchYoutube } from "@/services/RoomService";

import RoomInfo from "@/components/room/RoomInfo";
import useWebSocket from "@/hooks/useWebSocket";
import UserContext from "@/contexts/UserContext";
import Header from "@/components/room/Header";
import LoadingComponent from "@/components/LoadingComponent";
import YoutubeVideoListSkeleton from "@/components/room/YoutubeVideoListSkeleton";
import YoutubeVideoList from "@/components/room/YoutubeVideoList";
import VideoPlayer from "@/components/room/VideoPlayer";
import { FaAngleLeft } from "react-icons/fa";

export default function Room() {
    const router = useRouter();
    const user = useContext(UserContext);
    const ws = useWebSocket();
    const [isLoading, setIsLoading] = useState(true);
    const [room, setRoom] = useState<Room>({
        name: "",
        bio: "",
        categories: [],
        privacy: "public",
        profile_image: null,
        total_members: 0,
    });

    const [youtubeVideos, setYoutubeVideos] = useState<YoutubeVideo[]>([]);
    const [isSearchLoading, setIsSearchLoading] = useState(false);
    const [showSearchResult, setShowSearchResult] = useState(false);

    const [videoId, setVideoId] = useState("");

    useEffect(() => {
        if (router.query.room_id) {
            ws.connect(router.query.room_id.toString());
            getRoomByIdHandler();
        }
    }, [router.query]);

    async function getRoomByIdHandler(): Promise<void> {
        setIsLoading(true);
        const result = await getRoomById(router.query.room_id.toString());
        if (result.isSuccess()) {
            const room = result.value;
            setRoom(room);
            if (room.video_player) {
                const videoPlayer = room.video_player as VideoPlayer;
                setVideoId(videoPlayer.video_id);
            }
        } else {

        }
        setIsLoading(false);
    }


    async function searchHandler(query: string): Promise<void> {
        setIsSearchLoading(true);
        setShowSearchResult(true);
        if (query.length == 0) {
            setIsSearchLoading(false);
            return;
        }
        let isYoutubeURL = false;
        try {
            const youtubeURL = new URL(query);
            if (youtubeURL.hostname.endsWith("youtube.com")) {
                isYoutubeURL = true;
            }
        } catch (error) {
            isYoutubeURL = false;
        }

        if (isYoutubeURL) {

        } else {
            const result = await searchYoutube(query);
            if (result.isSuccess()) {
                setYoutubeVideos(result.value);
            }
        }
        setIsSearchLoading(false);
    }

    function onSelectVideoHandler(videoId: string): void {
        setVideoId(videoId);
        setShowSearchResult(false);
    }

    return (
        <div className="w-full h-screen overflow-auto flex flex-col items-center dark:bg-dark-gray gap-10">
            {isLoading && <LoadingComponent />}
            <Header searchHandler={searchHandler} />
            {
                showSearchResult ? (
                    isSearchLoading ? (
                        <YoutubeVideoListSkeleton />
                    ) : (
                        <div className="w-full flex flex-col gap-2">
                            <div onClick={() => setShowSearchResult(false)} className="w-full px-8 flex items-center gap-2 dark:text-white text-black cursor-pointer hover:underline">
                                <FaAngleLeft />
                                <div>Go Back</div>
                            </div>
                            <YoutubeVideoList onSelectVideo={onSelectVideoHandler} videos={youtubeVideos} />
                        </div>
                    )
                ) : (
                    <div className="w-full grid grid-cols-3 px-8 gap-8">
                        <div className="w-full col-span-2">
                            {videoId.length > 0 ? (
                                <VideoPlayer videoId={videoId} isAdmin={(room.admin as User)._id == user._id} room={room} ws={ws.ws} />
                            ) : (
                                <div className="w-full flex flex-col items-center text-white font-bold text-2xl bg-dark-gray-bg rounded-lg border border-zinc-700 py-4">Try searching to get started</div>
                            )}
                        </div>
                        <div className="w-full">
                            {room._id && <RoomInfo room={room} />}
                        </div>
                    </div>
                )
            }
        </div>
    )
}