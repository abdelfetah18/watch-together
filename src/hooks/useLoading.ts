import { useState } from "react";

export interface useLoadingReturn {
    isLoading: boolean;
    show: () => void;
    hide: () => void;
};

export default function useLoading() {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const show = () => {
        setIsLoading(true);
    }

    const hide = () => {
        setIsLoading(false);
    }

    return { isLoading, show, hide };
}