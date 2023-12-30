import { useLoadingReturn } from "@/hooks/useLoading";
import { createContext } from "react";

const initialValue: useLoadingReturn = {
    hide: () => { },
    show: () => { },
    isLoading: false
};

export default createContext<useLoadingReturn>(initialValue);