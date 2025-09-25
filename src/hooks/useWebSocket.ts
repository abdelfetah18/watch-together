import { WebSocketClient } from "@/domain/WebSocketClient";
import { MutableRefObject, useRef } from "react";

export interface useWebSocketReturn {
    ws: MutableRefObject<WebSocketClient>;
    connect: (room_id: string) => void;
};

export default function useWebSocket(): useWebSocketReturn {
    const ws = useRef<WebSocketClient>(null);

    const connect = (room_id: string): void => {
        let hostname = location.host;
        const websocket_url = process.env.NODE_ENV == 'production' ? `${location.protocol.includes('https') ? 'wss' : 'ws'}:${hostname}/` : 'ws://localhost:4000/';
        ws.current = new WebSocketClient(new WebSocket(`${websocket_url}?room_id=${room_id}`));
    }

    return {
        ws,
        connect
    };
}