import ChatBoxContext from "@/contexts/ChatBoxContext";
import RoomContext from "@/contexts/RoomContext";
import UserSessionContext from "@/contexts/UserSessionContext";
import useMessage from "@/hooks/useMessage";
import { useContext, useEffect, useRef } from "react";
import { FaAngleDown, FaAngleUp, FaPaperPlane, FaTimes } from "react-icons/fa";

export default function ChatBox({ messagesManager }) {
    const userSession = useContext(UserSessionContext);
    const { room } = useContext(RoomContext);
    const chatBoxManager = useContext(ChatBoxContext);
    const { message, setMessageContent, sendMessage } = useMessage();
    const messagesWrapperRef = useRef<HTMLDivElement>();

    useEffect(() => {
        messagesWrapperRef.current.scrollTo({
            behavior: "smooth",
            top: messagesWrapperRef.current.scrollHeight
        });
    },[messagesManager.messages]);

    const toggleMinimize = () => {
        if (chatBoxManager.isMinimized) {
            chatBoxManager.maximize();
        } else {
            chatBoxManager.minimize();
        }
    }

    const send = () => {
        sendMessage();
        messagesManager.appendMessage({ ...message, room, user: userSession.user, _createdAt: (new Date()).toDateString() });
    }

    return (
        <div className="fixed bottom-0 right-10 w-96 flex flex-col items-center bg-indigo-400 dark:bg-indigo-900 rounded-lg overflow-auto">
            <div className="w-full px-4 flex items-center justify-between py-2 text-indigo-100 bg-indigo-500">
                <div className="font-semibold">CHAT</div>
                <div className="flex items-center">
                    {chatBoxManager.isMinimized && <FaAngleUp onClick={toggleMinimize} className="cursor-pointer hover:text-indigo-400" title="Maximize" />}
                    {!chatBoxManager.isMinimized && <FaAngleDown onClick={toggleMinimize} className="cursor-pointer hover:text-indigo-400" title="Maximize" />}
                    <FaTimes onClick={() => { chatBoxManager.close(); }} className="cursor-pointer ml-2 hover:text-indigo-400" title="Close" />
                </div>
            </div>

            <div className={`w-full flex-col overflow-clip ${chatBoxManager.isMinimized ? "h-0" : ""}`}>
                <div ref={messagesWrapperRef} className="w-full flex flex-col h-96 overflow-auto">
                    {
                        messagesManager.messages.map((m, index) => {
                            if ((m.user as User)._id == userSession.user_id) {
                                return (
                                    <div key={index} className="flex flex-col pr-2 w-full items-end my-1">
                                        <div className="w-2/3 flex flex-row items-center justify-end">
                                            <div className="bg-blue-700 rounded-lg rounded-br-none px-4 py-2 text-white text-sm mx-1">{m.message}</div>
                                        </div>
                                        <div className="flex flex-row items-center">
                                            <div className="text-indigo-300 text-xs px-2 py-1">{(new Date(m._createdAt)).toLocaleTimeString("en", { hour: "2-digit", minute: "2-digit" })}</div>
                                        </div>
                                    </div>
                                )
                            } else {
                                return (
                                    <div key={index} className="flex flex-col w-full items-start my-1">
                                        <div className="w-2/3 flex flex-row items-center">
                                            <div className="py-1 px-1">
                                                <img alt="profile_image" className="w-8 h-8 rounded-full" src={(m.user as User).profile_image ? (m.user as User).profile_image + "?h=100&w=100&fit=crop&crop=center" : "/profile_1_1.png"} />
                                            </div>
                                            <div className="bg-indigo-300 rounded-lg rounded-bl-none px-4 py-2 text-center text-indigo-100 text-sm mx-1">{m.message}</div>
                                        </div>
                                        <div className="flex flex-row items-center">
                                            <div className="text-indigo-300 text-xs px-2">{(new Date(m._createdAt)).toLocaleTimeString("en", { hour: "2-digit", minute: "2-digit" })}</div>
                                        </div>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
                <div className="w-full flex flex-row items-center rounded-lg bg-indigo-100">
                    <input onKeyDown={(evt) => { if (evt.code === "Enter") { send(); } }} onChange={(evt) => setMessageContent(evt.target.value)} value={message.message} className="px-4 w-full bg-transparent text-indigo-900 focus:outline-none placeholder:text-indigo-400 font-semibold" type="text" placeholder="Type a message..." />
                    <button onClick={send} className="rounded-lg bg-indigo-700 hover:bg-sky-800 py-2 px-4 text-xl text-sky-50  uppercase"><FaPaperPlane /></button>
                </div>
            </div>
        </div>
    )
}