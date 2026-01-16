import { FaUsers } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { getMembers } from "@/services/RoomService";
import ToastContext from "@/contexts/ToastContext";

interface MembersViewProps {
    room: Room;
}

export default function MembersView({ room }: MembersViewProps) {
    const toastManager = useContext(ToastContext);
    const [members, setMembers] = useState<RoomMember[]>([]);

    async function getRoomMembersHandler(): Promise<void> {
        const result = await getMembers(room._id);
        if (result.isSuccess()) {
            setMembers(result.value);
        } else {
            toastManager.alertError(result.error);
        }
    }

    useEffect(() => { getRoomMembersHandler(); }, [room]);

    return (
        <div className="w-full h-full flex flex-col items-center overflow-auto">
            <div className="w-full flex flex-col overflow-auto">
                <div className="w-full flex items-center justify-between text-black dark:text-white py-2 px-4 border-b border-[#2a2a2a]">
                    <div className="flex items-center gap-2">
                        <FaUsers />
                        <div>Members</div>
                    </div>
                </div>
                <div className="w-full flex flex-col items-center overflow-auto">
                    {
                        members.map((member, index) => {
                            return (
                                <div key={index} className="w-full flex items-center gap-2 px-4 py-2 dark:hover:bg-zinc-800 cursor-pointer">
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
    )
}