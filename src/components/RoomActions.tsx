import ToastContext from "@/contexts/ToastContext";
import UserContext from "@/contexts/UserContext";
import { getInviteURL, leaveRoom } from "@/services/RoomService";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import { FaAngleDown, FaCog, FaUserPlus } from "react-icons/fa";
import { MdExitToApp } from "react-icons/md";
import LoadingComponent from "./LoadingComponent";

interface RoomActionsProps {
    room: Room;
}

export default function RoomActions({ room }: RoomActionsProps) {
    const user = useContext(UserContext);
    const toastManager = useContext(ToastContext);

    const menuRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    async function copyInviteURLHandler(): Promise<void> {
        const result = await getInviteURL(room._id);
        if (result.isSuccess()) {
            navigator.clipboard.writeText(result.value);
            toastManager.alertSuccess("Invite url copied.");
        } else {
            toastManager.alertError("Something went wrong while fetching invite url.");
        }
    }

    const leaveRoomHandler = async (): Promise<void> => {
        setIsLoading(true);
        const result = await leaveRoom(room._id);
        if (result.isFailure()) {
            toastManager.alertError(result.error);
        } else {
            toastManager.alertSuccess("you leaved a room successfully");
            window.location.href = "/explore";
        }
        setIsLoading(false);
    }

    useEffect(() => {
        const callback = (event: PointerEvent) => {
            if (menuRef.current && menuRef.current.contains(event.target as Node)) {
                return;
            }
            setIsOpen(false);
        };

        if (isOpen) {
            document.addEventListener("click", callback);
        } else {
            document.removeEventListener("click", callback);
        }
    }, [isOpen]);

    return (
        <div className="w-full px-4 py-2">
            {isLoading && <LoadingComponent />}
            <div ref={menuRef} className="relative flex items-center gap-2">
                <div className="text-white">{room.name}</div>
                <FaAngleDown onClick={() => setIsOpen(state => !state)} className="text-white cursor-pointer" />
                {
                    isOpen && (
                        <div className="absolute w-60 left-0 top-full mt-2 bg-gray-200 dark:bg-dark-gray-bg rounded-lg py-2 border border-gray-200 dark:border-zinc-700 z-10">
                            <div className="w-full flex flex-col items-start">
                                <div onClick={copyInviteURLHandler} className="px-8 py-2 w-full flex items-center justify-between gap-4 cursor-pointer text-gray-900 dark:text-gray-50 hover:bg-gray-200 dark:hover:bg-zinc-700">
                                    <div className="text-sm">Invite Friend</div>
                                    <FaUserPlus />
                                </div>
                                {
                                    user._id == (room.admin as User)._id ? (
                                        <Link href={"/room/" + room._id + "/settings"} className="px-8 py-2 w-full flex items-center justify-between gap-4 cursor-pointer text-gray-900 dark:text-gray-50 hover:bg-gray-200 dark:hover:bg-zinc-700">
                                            <div className="text-sm">Settings</div>
                                            <FaCog />
                                        </Link>
                                    ) : (
                                        <>
                                            <div className="w-full px-4"><div className="w-full h-px bg-zinc-800"></div></div>
                                            <div onClick={leaveRoomHandler} className="px-8 py-2 w-full flex items-center justify-between gap-4 cursor-pointer text-red-500 hover:bg-gray-200 dark:hover:bg-zinc-700">
                                                <div>Leave Room</div>
                                                <MdExitToApp />
                                            </div>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        </div>

    )
}