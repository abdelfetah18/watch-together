import TabsContext from "@/contexts/TabsContext";
import { ReactNode, useCallback, useState } from "react";

type TabsManagerProps = {
    defaultTab: string;
    children: ReactNode;
};

export const TabsManager: React.FC<TabsManagerProps> = ({
    defaultTab,
    children,
}) => {
    const [activeTab, setActiveTab] = useState(defaultTab);

    const goTo = useCallback((id: string) => {
        setActiveTab(id);
    }, []);

    return (
        <TabsContext.Provider value={{ activeTab, goTo }}>
            {children}
        </TabsContext.Provider>
    );
};
