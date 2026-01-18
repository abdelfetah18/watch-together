import { useState } from "react";
import Header from "@/components/room/Header";
import YoutubeVideoListSkeleton from "@/components/room/YoutubeVideoListSkeleton";
import YoutubeVideoList from "@/components/room/YoutubeVideoList";
import { searchYoutube } from "@/services/RoomService";
import { FaAngleLeft } from "react-icons/fa";
import useTabs from "@/hooks/useTabs";

interface VideoPlayerSearchViewProps {
    canGoBack: boolean;
    selectVideo: (videoId: string) => void;
}

export default function VideoPlayerSearchView({ canGoBack, selectVideo }: VideoPlayerSearchViewProps) {
    const { goTo } = useTabs();
    const [youtubeVideos, setYoutubeVideos] = useState<YoutubeVideo[]>([]);
    const [isSearchLoading, setIsSearchLoading] = useState(false);
    const [showResult, setShowResult] = useState(false);

    async function searchHandler(query: string): Promise<void> {
        setIsSearchLoading(true);
        setShowResult(true);
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
        selectVideo(videoId);
        goTo("video player");
    }

    function goBackHandler() {
        goTo("video player");
    }

    return (
        <div className="w-full h-full flex flex-col gap-2">
            {!showResult && canGoBack && (
                <div onClick={goBackHandler} className="px-8 py-4 text-white flex flex-row items-center gap-2 hover:underline cursor-pointer">
                    <FaAngleLeft />
                    <div>Back</div>
                </div>
            )}
            <Header searchHandler={searchHandler} />
            {showResult && canGoBack && (
                <div onClick={goBackHandler} className="px-8 py-4 text-white flex flex-row items-center gap-2 hover:underline cursor-pointer">
                    <FaAngleLeft />
                    <div>Back</div>
                </div>
            )}
            {
                showResult && (isSearchLoading ? (
                    <YoutubeVideoListSkeleton />
                ) : (
                    <div className="w-full flex flex-col gap-2">
                        <YoutubeVideoList onSelectVideo={onSelectVideoHandler} videos={youtubeVideos} />
                    </div>
                ))
            }
        </div>
    )
}