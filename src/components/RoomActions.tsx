import ToastContext from "@/contexts/ToastContext";
import { getInviteURL } from "@/services/RoomService";
import { useContext, useEffect, useRef, useState } from "react";
import { FaAngleDown, FaEdit, FaUserPlus } from "react-icons/fa";

interface RoomActionsProps {
    room: Room;
}

export default function RoomActions({ room }: RoomActionsProps) {
    const toastManager = useContext(ToastContext);

    const menuRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    async function copyInviteURLHandler(): Promise<void> {
        const result = await getInviteURL(room._id);
        if (result.isSuccess()) {
            navigator.clipboard.writeText(result.value);
            toastManager.alertSuccess("Invite url copied.");
        } else {
            toastManager.alertError("Something went wrong while fetching invite url.");
        }
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
            <div ref={menuRef} className="relative flex items-center gap-2">
                <div className="text-white">{room.name}</div>
                <FaAngleDown onClick={() => setIsOpen(state => !state)} className="text-white cursor-pointer" />
                {
                    isOpen && (
                        <div className="absolute w-60 left-0 top-full mt-2 bg-gray-200 dark:bg-dark-gray-bg rounded-lg py-2 border border-gray-200 dark:border-zinc-700 z-10">
                            <div className="w-full flex flex-col gap-2 items-start py-2">
                                <a href={"/room/" + room._id + "/edit"} className="px-8 py-2 w-full flex items-center gap-4 cursor-pointer text-gray-900 dark:text-gray-50 hover:bg-gray-200 dark:hover:bg-zinc-700">
                                    <FaEdit />
                                    <div className="text-sm">Edit Room</div>
                                </a>
                                <div onClick={copyInviteURLHandler} className="px-8 py-2 w-full flex items-center gap-4 cursor-pointer text-gray-900 dark:text-gray-50 hover:bg-gray-200 dark:hover:bg-zinc-700">
                                    <FaUserPlus />
                                    <div className="text-sm">Invite Friend</div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>

    )
}