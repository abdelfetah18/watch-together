import RoomInfo from "@/components/room/RoomInfo";
import useWebSocket from "@/hooks/useWebSocket";
import WebSocketContext from "@/contexts/WebSocketContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useRoom from "@/hooks/useRoom";
import RoomContext from "@/contexts/RoomContext";
import VideoExplorer from "@/components/room/VideoExplorer";


export default function Room() {
    const ws = useWebSocket();
    const room = useRoom(undefined, true);
    const router = useRouter();

    useEffect(() => {
        if (router.query.room_id) {
            ws.connect(router.query.room_id.toString());
            room.getRoomById(router.query.room_id.toString());
        }
    }, [router.query]);

    return (
        <WebSocketContext.Provider value={ws}>
            <RoomContext.Provider value={room}>
                {
                    !room.isLoading && (
                        <div className="flex flex-row w-screen h-screen items-center">
                            <VideoExplorer videoPlayer={room.room.video_player as VideoPlayer} />
                            <RoomInfo />
                        </div>
                    )
                }
            </RoomContext.Provider>
        </WebSocketContext.Provider>
    )
}