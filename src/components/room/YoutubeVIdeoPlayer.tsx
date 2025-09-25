import RoomContext from "@/contexts/RoomContext";
import WebSocketContext from "@/contexts/WebSocketContext";
import { useContext, useEffect, useRef } from "react";

interface YoutubeVideoPlayerProps {
    videoId: string;
    isAdmin: boolean;
}

export default function YoutubeVideoPlayer({ videoId, isAdmin }: YoutubeVideoPlayerProps) {
    const { room } = useContext(RoomContext);
    const videoPlayer = room.video_player as VideoPlayer;
    const youtubePlayerRef = useRef<YT.Player>(null);
    const { ws } = useContext(WebSocketContext);

    const handleVideoPlayerPayload = (payload: VideoPlayerEventPayload): void => {
        if (!isAdmin) {
            const url = new URL(youtubePlayerRef.current.getVideoUrl())
            const _videoId = url.searchParams.get("v")
            if (_videoId != payload.data.video_url) {
                youtubePlayerRef.current.loadVideoById(payload.data.video_url);
            }
            handleAction(payload);
        } else {
            if (payload.action == "sync") {
                let action: VideoPlayerAction = "pause";
                if (youtubePlayerRef.current.getPlayerState() == YT.PlayerState.PLAYING) {
                    action = "play";
                }
                ws.current.send<VideoPlayerEventPayload>("video_player", { action, data: { video_url: videoId, timestamp: youtubePlayerRef.current.getCurrentTime() } });
            }
        }
    }

    const handleAction = (payload: VideoPlayerEventPayload) => {
        if (payload.action == "play") {
            youtubePlayerRef.current.playVideo();
            youtubePlayerRef.current.seekTo(payload.data.timestamp, true);
        }

        if (payload.action == "pause") {
            youtubePlayerRef.current.pauseVideo();
            youtubePlayerRef.current.seekTo(payload.data.timestamp, true);
        }

        if (payload.action == "start") {
            youtubePlayerRef.current.playVideo();
            youtubePlayerRef.current.seekTo(0, true);
        }

        if (payload.action == "update") {
            youtubePlayerRef.current.seekTo(payload.data.timestamp, true);
        }
    }

    const onPause = () => {
        if (isAdmin) {
            let payload: VideoPlayerEventPayload = { action: "pause", data: { video_url: videoId, timestamp: youtubePlayerRef.current.getCurrentTime() } };
            ws.current.send("video_player", payload)
        }
    }

    const onPlay = () => {
        if (isAdmin) {
            let payload: VideoPlayerEventPayload = { action: "play", data: { video_url: videoId, timestamp: youtubePlayerRef.current.getCurrentTime() } };
            ws.current.send("video_player", payload)
        }
    }

    useEffect(() => {
        youtubePlayerRef.current = new YT.Player("player", {
            videoId,
            width: "100%",
            events: {
                onStateChange: () => {
                    if (youtubePlayerRef.current.getPlayerState() == YT.PlayerState.PAUSED) { onPause(); }
                    if (youtubePlayerRef.current.getPlayerState() == YT.PlayerState.PLAYING) { onPlay(); }
                },
                onReady: () => {
                    if (videoPlayer.is_playing) {
                        youtubePlayerRef.current.playVideo();
                        youtubePlayerRef.current.seekTo(videoPlayer.timestamp, true);
                    }
                },
            },
            playerVars: {
                // controls: 0,
                fs: 1,
                rel: 0,
                loop: 0,
            },
        });

        return () => {
            youtubePlayerRef.current.destroy();
        }
    }, [videoId]);

    useEffect(() => {
        ws.current.addEventListener("video_player", ({ detail }) => {
            handleVideoPlayerPayload(detail);
        });

        // FIXME: Find a better way to handle this.
        setTimeout(() => {
            if (!isAdmin) {
                ws.current.send<VideoPlayerEventPayload>("video_player", { action: "sync", data: { video_url: '', timestamp: 0 } });
            }
        }, 3000);
    }, []);

    return (
        <div id="player" className="w-11/12 h-full"></div>
    )
}