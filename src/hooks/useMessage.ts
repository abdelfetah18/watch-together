import WebSocketContext from "@/contexts/WebSocketContext";
import { useContext, useState } from "react";

const initMessage: Message = {
    message: '',
    _createdAt: '',
    type: 'text',
    user: { username: '', profile_image: null },
    room: { bio: '', categories: [], name: '', privacy: 'private', profile_image: null, total_members: 0 }
};

export default function useMessage() {
    const { ws } = useContext(WebSocketContext);
    const [message, setMessage] = useState<Message>(initMessage);

    const setMessageContent = (message: string) => {
        setMessage(state => ({ ...state, message }));
    }

    const sendMessage = (): void => {
        ws.current.send<{ message: string; type: string; }>("chat", { message: message.message, type: message.type });
        setMessage(initMessage);
    }

    return {
        message,
        sendMessage,
        setMessageContent
    };
}