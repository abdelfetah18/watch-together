import useVideoPlayer from "@/hooks/useVideoPlayer";
import { updateVideoPlayerById } from "@/services/VideoPlayerService";
import TabView from "./TabView";
import VideoPlayerView from "./VideoPlayerView";
import ChatView from "./ChatView";
import MembersView from "./MembersView";
import VideoPlayerSearchView from "./VideoPlayerSearchView";

interface RoomViewsProps {
    room: Room;
}

export default function RoomViews({ room }: RoomViewsProps) {
    const { videoPlayerRef, onReady, onPlay, onPause, onSync, videoId, setVideoId, timestampDiff } = useVideoPlayer({ room });
    const selectVideoHandler = async (videoId: string): Promise<void> => {
        setVideoId(videoId);
        const videoPlayer = room.video_player as VideoPlayer;
        await updateVideoPlayerById(room._id, videoPlayer._id, { video_id: videoId, is_playing: false, timestamp: 0 });
    }

    return (
        <div className="w-4/5 h-full dark:bg-zinc-900">
            <TabView id="video player">
                <VideoPlayerView
                    room={room}
                    videoPlayerRef={videoPlayerRef}
                    videoId={videoId}
                    setVideoId={setVideoId}
                    onReady={onReady}
                    onPlay={onPlay}
                    onPause={onPause}
                    onSync={onSync}
                    timestampDiff={timestampDiff}
                />
            </TabView>
            <TabView id="chat">
                <ChatView room={room} />
            </TabView>
            <TabView id="members">
                <MembersView room={room} />
            </TabView>
            <TabView id="search">
                <VideoPlayerSearchView canGoBack={videoId?.length > 0} selectVideo={selectVideoHandler} />
            </TabView>
        </div>
    )
}