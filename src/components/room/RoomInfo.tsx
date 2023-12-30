import ChatBoxContext from "@/contexts/ChatBoxContext";
import RoomContext from "@/contexts/RoomContext";
import ThemeContext from "@/contexts/ThemeContext";
import useChatBox from "@/hooks/useChatBox";
import useMessages from "@/hooks/useMessages";
import useRoomMemebers from "@/hooks/useRoomMembers";
import { useContext, useState } from "react";
import { FaUserPlus, FaEdit, FaAngleDown, FaFacebookMessenger, FaMoon, FaSun } from "react-icons/fa"
import ChatBox from "./ChatBox";

export default function RoomInfo() {
    const chatBoxManager = useChatBox();
    const { room, getInviteUrl } = useContext(RoomContext);
    const messagesManager = useMessages(room._id);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { room_members } = useRoomMemebers(room._id);
    const [isOpen, setIsOpen] = useState(false);

    async function copyInviteUrl() {
        await getInviteUrl();
        setIsOpen(false);
    }

    return (
        <ChatBoxContext.Provider value={chatBoxManager}>
            <div className="w-1/4 dark:bg-gray-800 bg-indigo-700 h-full flex flex-col items-center">
                <div className="w-11/12 flex flex-col items-center h-full">
                    <div className="flex flex-row w-full py-4">
                        <div className="flex flex-col items-center rounded-l-lg">
                            <div className="w-12 h-12 rounded-full">
                                <img alt="profile_image" className="w-full h-full object-cover rounded-full" src={room.profile_image ? room.profile_image.url + "?h=300&w=400&fit=crop&crop=center" : "/profile_4_3.png"} />
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center flex-grow px-4">
                            <div className="w-full text-sm text-indigo-50 font-semibold">{room.name}</div>
                            <div className="w-full text-xs text-indigo-300">{room.bio || 'Bio'}</div>
                        </div>
                        <div className="text-indigo-100 my-auto cursor-pointer hover:text-indigo-400 relative">
                            <FaAngleDown onClick={() => setIsOpen(state => !state)} />
                            {
                                isOpen && (
                                    <div className="absolute right-0 w-80 top-full flex flex-col items-center bg-indigo-900 rounded-lg">
                                        <a href={"/room/" + room._id + "/edit"} className="py-2 w-full flex items-center justify-center cursor-pointer text-xs text-gray-50 hover:bg-indigo-500 rounded-lg">
                                            <FaEdit />
                                            <div className="ml-2 font-semibold">EDIT ROOM</div>
                                        </a>
                                        <div onClick={copyInviteUrl} className="py-2 w-full flex items-center justify-center cursor-pointer text-xs text-gray-50 hover:bg-indigo-500 rounded-lg">
                                            <FaUserPlus />
                                            <div className="ml-2 font-semibold">INVITE</div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>

                    <div onClick={() => { if (chatBoxManager.isOpen) { chatBoxManager.close(); } else { chatBoxManager.open(); } }} className={`w-full select-none bg-indigo-400 flex items-center justify-center rounded-full text-indigo-100 text-sm font-semibold py-2 mt-8 cursor-pointer ${chatBoxManager.isOpen ? "bg-indigo-600" : ""}`}>
                        <FaFacebookMessenger />
                        <div className="ml-2">{chatBoxManager.isOpen ? "CLOSE" : "OPEN"} CHAT</div>
                    </div>

                    <div onClick={toggleTheme} className="w-full bg-indigo-400 hover:bg-indigo-500 flex items-center justify-center rounded-full text-indigo-100 text-sm font-semibold py-2 mt-2 cursor-pointer">
                        {theme == 'dark' && (<FaMoon />)}
                        {theme == 'light' && (<FaSun />)}
                        <div className="ml-2 uppercase">{theme} MODE</div>
                    </div>

                    <div className="w-full flex flex-col flex-grow my-4 overflow-auto">
                        <div className="text-indigo-100 font-semibold">Recent Videos:</div>
                    </div>

                    <div className="w-full flex flex-col my-4 overflow-auto">
                        <div className="text-indigo-100 font-semibold">Members:</div>
                        <div className="w-full flex flex-col mt-4 overflow-auto">
                            {
                                room_members.map((member, index) => {
                                    return (
                                        <div key={index} className="w-full flex items-center mb-2">
                                            <img className="h-8 w-8 rounded-full object-cover" src={(member.user as User).profile_image ? (member.user as User).profile_image.url : "/profile_4_3.png"} />
                                            <div className={`text-sm ml-2 ${(room.admin as User)._id == (member.user as User)._id ? "text-indigo-300 font-semibold dark:text-indigo-700" : "text-indigo-100 "}`}>{(member.user as User).username}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                    {chatBoxManager.isOpen && <ChatBox messagesManager={messagesManager} />}
                </div>
            </div>
        </ChatBoxContext.Provider>
    )
}