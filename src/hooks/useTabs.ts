import TabsContext from "@/contexts/TabsContext";
import { useContext } from "react";

export default function useTabs() {
    const ctx = useContext(TabsContext);
    if (!ctx) {
        throw new Error("useTabs must be used within TabsManager");
    }
    return ctx;
};
