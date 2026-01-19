import ToastContext from "@/contexts/ToastContext";
import useTabs from "@/hooks/useTabs";
import { deleteRoom } from "@/services/RoomService";
import { useContext, useState } from "react";
import { IconType } from "react-icons";
import { FaTrash, FaUser } from "react-icons/fa";
import LoadingComponent from "./LoadingComponent";

interface RoomSettingsSideBarProps {
    room: Room;
}

export default function RoomSettingsSideBar({ room }: RoomSettingsSideBarProps) {
    const toastManager = useContext(ToastContext);
    const { activeTab, goTo } = useTabs();
    const [isLoading, setIsLoading] = useState(false);

    const deleteRoomHandler = async (): Promise<void> => {
        setIsLoading(true);
        const result = await deleteRoom(room._id);
        if (result.isFailure()) {
            toastManager.alertError(result.error);
        } else {
            toastManager.alertError("room deleted successfully");
            window.location.href = "/explore";
        }
        setIsLoading(false);
    }

    return (
        <div className="w-1/5 h-full flex flex-col items-center border-r dark:border-r dark:border-[#2a2a2a] bg-zinc-950">
            {isLoading && <LoadingComponent />}
            <div className="w-full px-4 py-2 text-lg text-gray-50">Room Settings</div>

            <div className="w-full flex flex-col items-center py-2">
                <div className="w-11/12 text-gray-900 dark:text-gray-400 text-sm py-2 px-2">{"Profile"}</div>
                {
                    roomProfileSettings.map(({ Icon, label }, index) => {
                        const default_style = "px-2 py-2 w-11/12 flex items-center gap-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-zinc-800 rounded-lg text-sm";
                        const isSelected = activeTab == label;

                        function onClick() {
                            goTo(label);
                        }

                        return (
                            <div key={index} onClick={onClick} className={`${default_style} ${isSelected ? "bg-zinc-800 dark:text-gray-50" : "text-gray-900 dark:text-gray-400"}`}>
                                <Icon className="text-lg" />
                                <div className="ml-2 font-medium text-sm">{label}</div>
                            </div>
                        );
                    })
                }
            </div>
            <div className="w-full px-4"><div className="w-full h-px bg-zinc-800"></div></div>
            <div onClick={deleteRoomHandler} className="mt-2 px-2 py-2 w-11/12 flex items-center gap-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-zinc-800 rounded-lg text-sm text-gray-900 dark:text-red-500">
                <FaTrash />
                <div>Delete Room</div>
            </div>
        </div>
    )
}

const roomProfileSettings: Array<{ Icon: IconType; label: string; }> = [
    {
        Icon: FaUser,
        label: "Room Profile"
    }
];