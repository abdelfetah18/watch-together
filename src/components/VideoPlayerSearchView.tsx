import { useState } from "react";
import Header from "@/components/room/Header";
import YoutubeVideoListSkeleton from "@/components/room/YoutubeVideoListSkeleton";
import YoutubeVideoList from "@/components/room/YoutubeVideoList";
import { searchYoutube } from "@/services/RoomService";

interface VideoPlayerSearchViewProps {
    selectVideo: (videoId: string) => void;
}

export default function VideoPlayerSearchView({ selectVideo }: VideoPlayerSearchViewProps) {
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
    }

    return (
        <div className="w-full h-full flex flex-col">
            <Header searchHandler={searchHandler} />
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