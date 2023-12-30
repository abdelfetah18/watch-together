import { useState } from "react";

type MessageType = "error" | "success" | "info";

interface Message {
    id: number;
    message: string;
    type: MessageType;
};

export interface useToastReturn {
    messages: Message[];
    alertError: (message: string, duration?: number) => void;
    alertSuccess: (message: string, duration?: number) => void;
    alertInfo: (message: string, duration?: number) => void;
}

const DEFAULT_DURATION = 3000;

export default function useToast() {
    let MESSAGE_ID = 0;
    const [messages, setMessages] = useState<Message[]>([]);

    const alert = (message: string, type: MessageType, duration?: number): void => {
        let id = MESSAGE_ID;
        setMessages(state => [...state, { id: id, message, type }]);
        setTimeout(() => {
            setMessages(state => {
                let msgs = [...state];
                return msgs.filter(msg => msg.id != id);
            });
        }, duration || DEFAULT_DURATION);
        MESSAGE_ID++;
    }

    const alertError = (message: string, duration?: number) => {
        alert(message, "error", duration);
    }

    const alertInfo = (message: string, duration?: number) => {
        alert(message, "info", duration);
    }

    const alertSuccess = (message: string, duration?: number) => {
        alert(message, "success", duration);
    }

    return {
        messages,
        alertError,
        alertInfo,
        alertSuccess
    };
}