import { createContext } from "react";

interface useChatBoxReturn {
    isOpen: boolean;
    isMinimized: boolean;
    open: () => void;
    close: () => void;
    minimize: () => void;
    maximize: () => void;
}

export default createContext<useChatBoxReturn>({
    isMinimized: false,
    close: () => { },
    isOpen: false,
    maximize: () => { },
    minimize: () => { },
    open: () => { }
});