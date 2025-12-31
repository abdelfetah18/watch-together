import { MutableRefObject, useEffect } from "react";

interface YoutubeVideoPlayerProps {
    videoId: string;
    videoPlayerRef: MutableRefObject<VideoPlayerObject>;
    onPlay: () => void;
    onPause: () => void;
    onReady: () => void;
}

class YoutubeVideoPlayerObject implements VideoPlayerObject {
    constructor(private ytPlayer: YT.Player) { }

    play() {
        this.ytPlayer.playVideo();
    }

    pause() {
        this.ytPlayer.pauseVideo();
    }

    start(videoId: string) {
        this.ytPlayer.loadVideoById(videoId, 0);
    }

    update(timestamp: number) {
        this.ytPlayer.seekTo(timestamp, true);
    }

    getCurrentTime(): number {
        return this.ytPlayer.getCurrentTime();
    }

    getPlayerState(): PlayerState {
        return this.ytPlayer.getPlayerState();
    }
}

export default function YoutubeVideoPlayer({ videoPlayerRef, videoId, onPause, onPlay, onReady }: YoutubeVideoPlayerProps) {
    useEffect(() => {
        const youtubePlayer = new YT.Player("player", {
            videoId,
            width: "100%",
            events: {
                onStateChange: () => {
                    if (youtubePlayer.getPlayerState() == YT.PlayerState.PAUSED) { onPause(); }
                    if (youtubePlayer.getPlayerState() == YT.PlayerState.PLAYING) { onPlay(); }
                },
                onReady: onReady,
            },
            playerVars: {
                // controls: 0,
                fs: 1,
                rel: 0,
                loop: 0,
            },
        });

        videoPlayerRef.current = new YoutubeVideoPlayerObject(youtubePlayer);

        return () => {
            youtubePlayer.destroy();
        }
    }, [videoId]);

    return (
        <div id="player" className="w-full h-full aspect-video rounded-lg"></div>
    )
}