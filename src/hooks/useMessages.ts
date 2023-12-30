import { useContext, useEffect, useState } from "react";
import useAxios from "./useAxios";
import WebSocketContext from "@/contexts/WebSocketContext";
import { ChatEvent } from "@/domain/WebSocketClient";

export default function useMessages(room_id: string) {
    const axios = useAxios();
    const { ws } = useContext(WebSocketContext);
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        axios.get<HttpResponseData<Message[]>>(`/api/room/chat?room_id=${room_id}`).then(response => {
            if (response.status == "success") {
                setMessages(response.data);
            }
        });

        ws.current.addEventListener("chat", (chatEvent: ChatEvent) => {
            let payload = chatEvent.detail;
            appendMessage(payload);
        });
    }, []);

    const appendMessage = (message: Message) => {
        setMessages(state => [...state, message]);
    }

    return {
        messages,
        appendMessage
    };
}