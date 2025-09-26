import { RefObject } from "react";
import YoutubeVideoPlayer from "./YoutubeVIdeoPlayer";
import { WebSocketClient } from "@/domain/WebSocketClient";

interface VideoPlayerProps {
    videoId: string;
    isAdmin: boolean;
    ws: RefObject<WebSocketClient>;
    room: Room;
};

export default function VideoPlayer({ videoId, isAdmin, room, ws }: VideoPlayerProps) {
    return (
        <div className="w-full h-full flex flex-col items-center bg-black rounded-lg aspect-video">
            <YoutubeVideoPlayer videoId={videoId} isAdmin={isAdmin} room={room} ws={ws} />
        </div>
    )
}