import useTabs from "@/hooks/useTabs";
import { ReactNode } from "react";

type TabViewProps = {
    id: string;
    children: ReactNode;
};

const TabView: React.FC<TabViewProps> = ({
    id,
    children,
}) => {
    const { activeTab } = useTabs();

    if (activeTab !== id) return null;

    return <>{children}</>;
};

export default TabView;