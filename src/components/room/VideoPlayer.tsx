import WebSocketContext from "@/contexts/WebSocketContext";
import { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { FaPause, FaPlay, FaVolumeMute, FaVolumeUp } from "react-icons/fa";

interface VideoPlayerProps {
    video_url: string;
    setVideoUrl: Dispatch<SetStateAction<string>>;
    isAdmin: boolean;
};

export default function VideoPlayer({ video_url, setVideoUrl, isAdmin }: VideoPlayerProps) {
    const { ws } = useContext(WebSocketContext);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [currentTime, setCurrentTime] = useState('0:00');
    const [maxTime, setMaxTime] = useState('0:00');
    const progressBarRef = useRef<HTMLDivElement>();
    const progressBarContainerRef = useRef<HTMLDivElement>();
    const videoPlayerRef = useRef<HTMLVideoElement>();

    function formatTime(seconds: number) {
        let minutes = Math.floor(seconds / 60);
        let remainingSeconds = Math.floor(seconds % 60);
        return minutes + ':' + (remainingSeconds < 10 ? '0' : '') + remainingSeconds;
    }

    const handleAction = (payload: VideoPlayerEventPayload) => {
        if (payload.action == "play") {
            play();
            videoPlayerRef.current.currentTime = payload.data.timestamp;
        }

        if (payload.action == "pause") {
            pause();
            videoPlayerRef.current.currentTime = payload.data.timestamp;
        }

        if (payload.action == "start") {
            play();
            videoPlayerRef.current.currentTime = 0;
        }

        if (payload.action == "update") {
            videoPlayerRef.current.currentTime = payload.data.timestamp;
        }
    }

    const handleVideoPlayerPayload = (payload: VideoPlayerEventPayload): void => {
        if (!isAdmin) {
            if (videoPlayerRef.current.src != payload.data.video_url) {
                setVideoUrl(payload.data.video_url);
                videoPlayerRef.current.addEventListener("loadeddata", () => {
                    videoPlayerRef.current.currentTime = payload.data.timestamp;
                    handleAction(payload);
                    videoPlayerRef.current.removeEventListener("loadeddata", this);
                });
            } else {
                handleAction(payload);
            }
        } else {
            if (payload.action == "sync") {
                let action: VideoPlayerAction = "pause";
                if (!videoPlayerRef.current.paused) {
                    action = "play";
                }
                ws.current.send<VideoPlayerEventPayload>("video_player", { action, data: { video_url, timestamp: videoPlayerRef.current.currentTime } });
            }
        }
    }

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

    const play = (): void => {
        videoPlayerRef.current.play();
        setIsPlaying(true);
        if (isAdmin) {
            let payload: VideoPlayerEventPayload = { action: "play", data: { video_url, timestamp: videoPlayerRef.current.currentTime } };
            ws.current.send("video_player", payload)
        }
    }

    const pause = (): void => {
        videoPlayerRef.current.pause();
        setIsPlaying(false);
        if (isAdmin) {
            let payload: VideoPlayerEventPayload = { action: "pause", data: { video_url, timestamp: videoPlayerRef.current.currentTime } };
            ws.current.send("video_player", payload)
        }
    }

    const mute = (): void => {
        videoPlayerRef.current.muted = true;
        setIsMuted(true);
    }

    const unmute = (): void => {
        videoPlayerRef.current.muted = false;
        setIsMuted(false);
    }

    const handleSeek = (event: any): void => {
        let seekPosition = (event.clientX - event.target.getBoundingClientRect().left) / progressBarContainerRef.current.offsetWidth;
        videoPlayerRef.current.currentTime = seekPosition * videoPlayerRef.current.duration;
        if (isAdmin) {
            let payload: VideoPlayerEventPayload = { action: "update", data: { video_url, timestamp: videoPlayerRef.current.currentTime } };
            ws.current.send("video_player", payload)
        }
    }

    const toggleState = (): void => {
        if (videoPlayerRef.current.paused) {
            play();
        } else {
            pause();
        }
    }

    const onLoadedData = (): void => {
        setMaxTime(formatTime(videoPlayerRef.current.duration));
        play();
    }

    const onPause = (): void => {
        setIsPlaying(false);
    }

    const onTimeUpdate = (): void => {
        progressBarRef.current.style.width = `${videoPlayerRef.current.currentTime / videoPlayerRef.current.duration * 100}%`;
        setCurrentTime(formatTime(videoPlayerRef.current.currentTime));
    }

    return (
        <div className="w-full h-full flex flex-col items-center bg-black relative">
            <video onClick={toggleState} onLoadedData={onLoadedData} onPause={onPause} onTimeUpdate={onTimeUpdate} ref={videoPlayerRef} className="h-full cursor-pointer" src={video_url}>

            </video>
            <div className="absolute bottom-0 left-0 w-full bg-black/40 flex flex-col items-center">
                <div onClick={handleSeek} ref={progressBarContainerRef} className="w-11/12 h-1 bg-white rounded-lg flex items-center overflow-clip mt-4 cursor-pointer">
                    <div ref={progressBarRef} style={{ width: '0%' }} className="h-1 bg-red-500 duration-300 ease-in"></div>
                </div>
                <div className="w-11/12 flex items-center mt-2 mb-4 text-indigo-50 select-none">
                    {/* <div className="text-xl mr-4 cursor-pointer hover:text-indigo-400"><FaStepBackward /></div> */}
                    {!isPlaying && (<div onClick={play} className="text-xl mr-4 cursor-pointer hover:text-indigo-400"><FaPlay /></div>)}
                    {isPlaying && (<div onClick={pause} className="text-xl mr-4 cursor-pointer hover:text-indigo-400"><FaPause /></div>)}
                    {/* <div className="text-xl mr-4 cursor-pointer hover:text-indigo-400"><FaStepForward /></div> */}
                    {!isMuted && (<div onClick={mute} className="text-xl mr-4 cursor-pointer hover:text-indigo-400"><FaVolumeUp /></div>)}
                    {isMuted && (<div onClick={unmute} className="text-xl mr-4 cursor-pointer hover:text-indigo-400"><FaVolumeMute /></div>)}

                    <div className=" text-sm mr-2">{currentTime} / {maxTime}</div>
                </div>
            </div>
        </div>
    )
}