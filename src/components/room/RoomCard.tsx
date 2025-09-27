import ToastContext from "@/contexts/ToastContext";
import { getInviteURL, getMembers } from "@/services/RoomService";
import { useContext, useEffect, useRef, useState } from "react";
import { FaEdit, FaEllipsisH, FaTimes, FaUserPlus, FaUsers } from "react-icons/fa";

interface RoomCardProps {
    room: Room;
}

export default function RoomCard({ room }: RoomCardProps) {
    const toastManager = useContext(ToastContext);

    const menuRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    const memebersListRef = useRef<HTMLDivElement>(null);
    const [showMemebersList, setShowMemebersList] = useState(false);

    const [members, setMembers] = useState<RoomMember[]>([]);

    async function copyInviteURLHandler(): Promise<void> {
        const result = await getInviteURL(room._id);
        if (result.isSuccess()) {
            navigator.clipboard.writeText(result.value);
            toastManager.alertSuccess("Invite url copied.");
        } else {
            toastManager.alertError("Something went wrong while fetching invite url.");
        }
    }

    useEffect(() => { getRoomMembersHandler(); }, []);
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

    async function getRoomMembersHandler(): Promise<void> {
        const result = await getMembers(room._id);
        if (result.isSuccess()) {
            console.log("members:", result.value);
            setMembers(result.value);
        } else {
            toastManager.alertError(result.error);
        }
    }

    return (
        <div className="w-full flex items-center gap-4">
            <div className="flex flex-col items-center rounded-l-lg">
                <div className="w-12 h-12 rounded-full">
                    <img alt="profile_image" className="w-full h-full object-cover rounded-full" src={room.profile_image ? room.profile_image.url + "?h=300&w=400&fit=crop&crop=center" : "/profile_4_3.png"} />
                </div>
            </div>
            <div className="flex flex-col items-center justify-center flex-grow">
                <div className="w-full text-sm dark:text-gray-50 text-gray-900 font-semibold">{room.name}</div>
                <div className="w-full text-xs text-gray-500">{room.bio || 'Bio'}</div>
            </div>
            <div ref={menuRef} className="dark:text-gray-100 text-gray-900 my-auto cursor-pointer hover:text-gray-400 relative">
                <div onClick={() => setIsOpen(state => !state)} className="bg-dark-gray-bg hover:bg-zinc-800 p-2 rounded-full"><FaEllipsisH /></div>
                {
                    isOpen && (
                        <div className="absolute right-0 w-80 top-full mt-2 flex flex-col items-center dark:bg-dark-gray-bg bg-light-gray shadow-xl rounded-lg">
                            <div className="w-full flex flex-col gap-2 items-start py-2">
                                <a href={"/room/" + room._id + "/edit"} className="px-8 py-2 w-full flex items-center gap-4 cursor-pointer text-gray-900 dark:text-gray-50 hover:bg-gray-200 dark:hover:bg-zinc-700">
                                    <FaEdit />
                                    <div className="text-sm">Edit Room</div>
                                </a>
                                <div
                                    onClick={() => setShowMemebersList(true)}
                                    className="px-8 py-2 w-full flex items-center gap-4 cursor-pointer text-gray-900 dark:text-gray-50 hover:bg-gray-200 dark:hover:bg-zinc-700"
                                >
                                    <FaUsers />
                                    <div>Members</div>
                                </div>
                                <div onClick={copyInviteURLHandler} className="px-8 py-2 w-full flex items-center gap-4 cursor-pointer text-gray-900 dark:text-gray-50 hover:bg-gray-200 dark:hover:bg-zinc-700">
                                    <FaUserPlus />
                                    <div className="text-sm">Invite Friend</div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>

            {showMemebersList && (
                <div
                    onClick={(event) => {
                        if (memebersListRef.current && memebersListRef.current.contains(event.target as Node)) {
                            return;
                        }
                        setShowMemebersList(false);
                    }}
                    className="absolute left-0 top-0 w-full h-full bg-black/40 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
                    <div ref={memebersListRef} className="w-1/2 min-h-1/2 max-h-[80%] flex flex-col bg-gray-200 dark:bg-dark-gray-bg rounded-lg">
                        <div className="w-full flex items-center justify-between text-black dark:text-white border-b border-gray-300 dark:border-zinc-700 py-4 px-8">
                            <div className="flex items-center gap-2">
                                <FaUsers />
                                <div>Members</div>
                            </div>
                            <div onClick={() => setShowMemebersList(false)} className="p-2 dark:bg-zinc-700 dark:hover:bg-zinc-500 rounded-full cursor-pointer">
                                <FaTimes />
                            </div>
                        </div>
                        <div className="w-full flex flex-col items-center overflow-auto">
                            {
                                members.map((member, index) => {
                                    return (
                                        <div key={index} className="w-full flex items-center gap-2 px-8 py-2 dark:hover:bg-zinc-700 cursor-pointer">
                                            <div className="w-8 h-8 rounded-full bg-light-gray dark:bg-dark-gray">
                                                <img className="w-full h-full rounded-full object-cover" src={(member.user as User).profile_image?.url || "/profile_1_1.png"} />
                                            </div>
                                            <div className="text-sm text-black dark:text-white">{(member.user as User).username}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}