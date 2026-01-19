import App from "@/components/Layout/App";
import { TabsManager } from "@/components/TabsManager";
import TabView from "@/components/TabView";
import RoomSettingsSideBar from "@/components/RoomSettingsSideBar";
import RoomProfileSettings from "@/components/RoomProfileSettings";
import useRoomNew from "@/hooks/useRoomNew";

export default function Settings() {
    const { isLoading, room } = useRoomNew();

    return (
        <App title="settings">
            <TabsManager defaultTab="Room Profile">
                <RoomSettingsSideBar room={room} />
                <div className="w-4/5 h-full px-8 py-2 flex flex-col items-center overflow-auto">
                    <TabView id="Room Profile">
                        {!isLoading && <RoomProfileSettings room={room} />}
                    </TabView>
                </div>
            </TabsManager>
        </App>
    );
}