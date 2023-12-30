import { useState } from "react";

export default function useChatBox() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isMinimized, setIsMinimized] = useState<boolean>(false);


    const open = (): void => { setIsOpen(true); }
    const close = (): void => { setIsOpen(false); }
    const minimize = (): void => { setIsMinimized(true); }
    const maximize = (): void => { setIsMinimized(false); }

    return {
        isOpen,
        isMinimized,
        open,
        close,
        minimize,
        maximize,
    };
}