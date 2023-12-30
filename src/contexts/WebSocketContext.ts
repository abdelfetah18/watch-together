import { useWebSocketReturn } from "@/hooks/useWebSocket";
import { createContext } from "react";

const initialValue: useWebSocketReturn = {
    ws: null,
    connect: (room_id: string): void => { room_id; }
};

export default createContext<useWebSocketReturn>(initialValue);