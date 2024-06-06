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
            <div className="w-1/4 dark:bg-dark-gray-bg bg-light-gray border-l dark:border-none h-full flex flex-col items-center">
                <div className="w-full flex flex-col items-center h-full">
                    <div onClick={() => setIsOpen(state => !state)} className="flex flex-row w-11/12 py-4 active:scale-105 duration-300 cursor-pointer select-none">
                        <div className="flex flex-col items-center rounded-l-lg">
                            <div className="w-12 h-12 rounded-full">
                                <img alt="profile_image" className="w-full h-full object-cover rounded-full" src={room.profile_image ? room.profile_image.url + "?h=300&w=400&fit=crop&crop=center" : "/profile_4_3.png"} />
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center flex-grow px-4">
                            <div className="w-full text-sm dark:text-gray-50 text-gray-900 font-semibold">{room.name}</div>
                            <div className="w-full text-xs text-gray-500">{room.bio || 'Bio'}</div>
                        </div>
                        <div className="dark:text-gray-100 text-gray-900 my-auto cursor-pointer hover:text-gray-400 relative">
                            <FaAngleDown />
                            {
                                isOpen && (
                                    <div className="absolute right-0 w-80 top-full flex flex-col items-center dark:bg-dark-gray bg-light-gray shadow-xl rounded-lg">
                                        <a href={"/room/" + room._id + "/edit"} className="py-2 w-full flex items-center justify-center cursor-pointer text-xs text-gray-900 dark:text-gray-50 hover:bg-gray-200 dark:hover:bg-gray-500 rounded-lg">
                                            <FaEdit />
                                            <div className="ml-2 font-semibold">EDIT ROOM</div>
                                        </a>
                                        <div onClick={copyInviteUrl} className="py-2 w-full flex items-center justify-center cursor-pointer text-xs text-gray-900 dark:text-gray-50 hover:bg-gray-200 dark:hover:bg-gray-500 rounded-lg">
                                            <FaUserPlus />
                                            <div className="ml-2 font-semibold">INVITE</div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>

                    <div onClick={() => { if (chatBoxManager.isOpen) { chatBoxManager.close(); } else { chatBoxManager.open(); } }} className={`w-11/12 select-none border dark:border-gray-50 border-gray-900 flex items-center justify-center rounded-full dark:text-gray-100 text-sm font-semibold py-2 mt-8 cursor-pointer duration-300 active:scale-105 ${chatBoxManager.isOpen ? "bg-primary-color text-gray-50" : "text-gray-900"}`}>
                        <FaFacebookMessenger />
                        <div className="ml-2">{chatBoxManager.isOpen ? "CLOSE" : "OPEN"} CHAT</div>
                    </div>

                    <div onClick={toggleTheme} className="w-11/12 border dark:border-gray-50 border-gray-900 flex items-center justify-center rounded-full dark:text-gray-100 text-gray-900 text-sm font-semibold py-2 mt-2 cursor-pointer duration-300 active:scale-105 select-none">
                        {theme == 'dark' && (<FaMoon />)}
                        {theme == 'light' && (<FaSun />)}
                        <div className="ml-2 uppercase">{theme} MODE</div>
                    </div>

                    <div className="w-11/12 flex-col flex-grow my-4 overflow-auto hidden">
                        <div className="text-gray-100 font-semibold">Recent Videos:</div>
                    </div>

                    <div className="w-full flex flex-col items-center my-4 overflow-auto">
                        <div className="w-11/12 dark:text-gray-100 text-gray-900 font-semibold py-4">Members:</div>
                        <div className="w-full flex flex-col items-center overflow-auto">
                            <div className="w-11/12 flex flex-col mt-4">
                                {
                                    room_members.filter(m => ((m.user as User)._id != (room.admin as User)._id)).map((member, index) => {
                                        return (
                                            <div key={index} className="w-full flex items-center mb-2">
                                                <img className="h-8 w-8 rounded-full object-cover" src={(member.user as User).profile_image ? (member.user as User).profile_image.url : "/profile_4_3.png"} />
                                                <div className={`text-sm ml-2 ${(room.admin as User)._id == (member.user as User)._id ? "text-primary-color font-semibold" : "dark:text-gray-100 text-gray-900"}`}>{(member.user as User).username}</div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>

                    {chatBoxManager.isOpen && <ChatBox messagesManager={messagesManager} />}
                </div>
            </div>
        </ChatBoxContext.Provider>
    )
}