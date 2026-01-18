import { TabsManager } from "@/components/TabsManager";

import App from "@/components/Layout/App";
import useRoomNew from "@/hooks/useRoomNew";
import RoomSideNavigation from "@/components/RoomSideNavigation";
import RoomViews from "@/components/RoomViews";

export default function Room() {
    const { isLoading, room } = useRoomNew();

    return (
        <App title={`room/${room._id}`}>
            {
                !isLoading && (
                    <TabsManager defaultTab="video player">
                        <div className="w-full h-full overflow-auto flex flex-row dark:bg-zinc-950">
                            <RoomSideNavigation room={room} />
                            <RoomViews room={room} />
                        </div>
                    </TabsManager>
                )
            }
        </App>
    )
}
