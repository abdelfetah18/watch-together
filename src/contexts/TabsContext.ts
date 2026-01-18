import { createContext } from "react";

type TabsContextType = {
    activeTab: string;
    goTo: (id: string) => void;
};

export default createContext<TabsContextType | null>(null);