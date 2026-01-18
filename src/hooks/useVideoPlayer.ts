import { useContext, useEffect, useRef, useState } from "react";
import UserContext from "@/contexts/UserContext";
import useWebSocket from "@/hooks/useWebSocket";

export default function useVideoPlayer({ room }: { room: Room; }) {
    const user = useContext(UserContext);
    const ws = useWebSocket();
    const isAdmin = user._id == (room.admin as User)?._id;
    const videoPlayerRef = useRef<VideoPlayerObject>(null);
    const [videoId, setVideoId] = useState(room.video_player.video_id);
    const [timestampDiff, setTimestampDiff] = useState(0);

    const handleVideoPlayerPayload = (payload: VideoPlayerEventPayload): void => {
        if (!videoPlayerRef.current) {
            return;
        }

        if (!isAdmin) {
            handleAction(payload);
        } else {
            if (payload.action == "sync") {
                ws.ws.current.send<VideoPlayerEventPayload>("video_player", { action: "update", data: { video_url: videoId, timestamp: videoPlayerRef.current.getCurrentTime() } });
            }
        }
    }

    const handleAction = (payload: VideoPlayerEventPayload) => {
        if (!videoPlayerRef.current) {
            return;
        }

        setTimestampDiff(Math.abs(payload.data.timestamp - videoPlayerRef.current.getCurrentTime()));

        if (payload.action == "play") {
            videoPlayerRef.current.play();
        }

        if (payload.action == "pause") {
            videoPlayerRef.current.pause();
        }

        if (payload.action == "start") {
            setVideoId(payload.data.video_url);
            videoPlayerRef.current.start(payload.data.video_url);
        }

        if (payload.action == "update") {
            videoPlayerRef.current.update(payload.data.timestamp);
        }
    }

    useEffect(() => {
        if (!room) {
            return;
        }

        setVideoId(room.video_player.video_id);
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
    }, [room]);


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

    const onSync = () => {
        if (!videoPlayerRef.current) {
            return;
        }

        if (!isAdmin) {
            let payload: VideoPlayerEventPayload = { action: "sync", data: { video_url: videoId, timestamp: videoPlayerRef.current.getCurrentTime() } };
            ws.ws.current.send("video_player", payload)
        }
    }

    return {
        videoPlayerRef,
        onReady,
        onPlay,
        onPause,
        onSync,
        videoId,
        setVideoId,
        timestampDiff,
    };
}