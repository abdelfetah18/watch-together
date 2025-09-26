import { ChatEvent, WebSocketClient } from "@/domain/WebSocketClient";
import { getMessages } from "@/services/RoomService";
import { useEffect, useRef, useState } from "react";

export default function useChat(roomId: string) {
    const wsRef = useRef<WebSocketClient>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        getMessagesHandler();

        const hostname = location.host;
        let url = "ws://localhost:4000/chat";
        if (process.env.NODE_ENV == 'production') {
            url = `${location.protocol.includes('https') ? 'wss' : 'ws'}:${hostname}/`;
        }

        wsRef.current = new WebSocketClient(new WebSocket(`${url}?room_id=${roomId}`));
        wsRef.current.addEventListener("chat", chatCallback);

        return () => {
            wsRef.current.removeEventListener("chat", chatCallback);
        };
    }, []);

    function chatCallback(chatEvent: ChatEvent): void {
        setMessages(state => [...state, chatEvent.detail]);
    }

    async function getMessagesHandler(): Promise<void> {
        setIsLoading(true);
        const result = await getMessages(roomId);
        console.log({ result });
        if (result.isSuccess()) {
            setMessages(result.value);
        }
        setIsLoading(false);
    }

    function sendMessage(message: Message): void {
        wsRef.current.send<{ message: string; type: string; }>("chat", { message: message.message, type: message.type });
        setMessages(state => [...state, message]);
    }

    return {
        messages,
        isLoading,
        sendMessage,
    };
}