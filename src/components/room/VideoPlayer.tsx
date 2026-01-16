import { useContext, useEffect, useRef } from "react";
import YoutubeVideoPlayer from "./YoutubeVIdeoPlayer";
import UserContext from "@/contexts/UserContext";
import useWebSocket from "@/hooks/useWebSocket";

interface VideoPlayerProps {
    videoId: string;
    room: Room;
};

export default function VideoPlayer({ videoId, room }: VideoPlayerProps) {
    const user = useContext(UserContext);
    const ws = useWebSocket();
    const isAdmin = user._id == (room.admin as User)?._id;
    const videoPlayerRef = useRef<VideoPlayerObject>(null);

    const handleVideoPlayerPayload = (payload: VideoPlayerEventPayload): void => {
        if (!videoPlayerRef.current) {
            return;
        }

        if (!isAdmin) {
            handleAction(payload);
        } else {
            if (payload.action == "sync") {
                let action: VideoPlayerAction = "pause";
                if (videoPlayerRef.current.getPlayerState() == YT.PlayerState.PLAYING) {
                    action = "play";
                }
                ws.ws.current.send<VideoPlayerEventPayload>("video_player", { action, data: { video_url: videoId, timestamp: videoPlayerRef.current.getCurrentTime() } });
            }
        }
    }

    const handleAction = (payload: VideoPlayerEventPayload) => {
        if (!videoPlayerRef.current) {
            return;
        }

        if (payload.action == "play") {
            videoPlayerRef.current.play();
        }

        if (payload.action == "pause") {
            videoPlayerRef.current.pause();
        }

        if (payload.action == "start") {
            videoPlayerRef.current.start(payload.data.video_url);
        }

        if (payload.action == "update") {
            videoPlayerRef.current.update(payload.data.timestamp);
        }
    }

    useEffect(() => {
        ws.connect(room._id);
        ws.ws.current.addEventListener("video_player", ({ detail }) => {
            handleVideoPlayerPayload(detail);
        });

        // FIXME: Find a better way to handle this.
        setTimeout(() => {
            if (!isAdmin) {
                ws.ws.current.send<VideoPlayerEventPayload>("video_player", { action: "sync", data: { video_url: '', timestamp: 0 } });
            }
        }, 3000);
    }, []);


    const onPause = () => {
        if (!videoPlayerRef.current) {
            return;
        }

        if (isAdmin) {
            let payload: VideoPlayerEventPayload = { action: "pause", data: { video_url: videoId, timestamp: videoPlayerRef.current.getCurrentTime() } };
            ws.ws.current.send("video_player", payload)
        }
    }

    const onPlay = () => {
        if (!videoPlayerRef.current) {
            return;
        }

        if (isAdmin) {
            let payload: VideoPlayerEventPayload = { action: "play", data: { video_url: videoId, timestamp: videoPlayerRef.current.getCurrentTime() } };
            ws.ws.current.send("video_player", payload)
        }
    }

    const onReady = () => {
        const videoPlayer = room.video_player as VideoPlayer | undefined;
        if (videoPlayer.is_playing) {
            videoPlayerRef.current.play();
            videoPlayerRef.current.update(videoPlayer.timestamp);
        }
    }

    return (
        <div className="w-full h-full flex flex-col items-center bg-black rounded-lg aspect-video">
            <YoutubeVideoPlayer videoPlayerRef={videoPlayerRef} videoId={videoId} onReady={onReady} onPlay={onPlay} onPause={onPause} />
        </div>
    )
}