import ChatBoxContext from "@/contexts/ChatBoxContext";
import RoomContext from "@/contexts/RoomContext";
import UserContext from "@/contexts/UserContext";
import useMessage from "@/hooks/useMessage";
import moment from "moment";
import { useContext, useEffect, useRef } from "react";
import { FaAngleDown, FaAngleUp, FaPaperPlane, FaTimes } from "react-icons/fa";

export default function ChatBox({ messagesManager }) {
    const user = useContext(UserContext);
    const { room } = useContext(RoomContext);
    const chatBoxManager = useContext(ChatBoxContext);
    const { message, setMessageContent, sendMessage } = useMessage();
    const messagesWrapperRef = useRef<HTMLDivElement>();

    useEffect(() => {
        messagesWrapperRef.current.scrollTo({
            behavior: "smooth",
            top: messagesWrapperRef.current.scrollHeight
        });
    }, [messagesManager.messages]);

    const toggleMinimize = () => {
        if (chatBoxManager.isMinimized) {
            chatBoxManager.maximize();
        } else {
            chatBoxManager.minimize();
        }
    }

    const send = () => {
        sendMessage();
        messagesManager.appendMessage({ ...message, room, user: user, _createdAt: (new Date()).toDateString() });
    }

    let lastTimestamp: Date | null = null;

    const isNewDay = (lastDate: Date | null, currentDate: Date): boolean => {
        if (!lastDate) return true;
        return lastDate.toDateString() !== currentDate.toDateString();
    };

    const isNewHour = (lastDate: Date | null, currentDate: Date): boolean => {
        if (!lastDate) return true;
        return lastDate.getHours() !== currentDate.getHours();
    };

    const isSignificantGap = (lastDate: Date | null, currentDate: Date, gapMinutes: number = 15): boolean => {
        if (!lastDate) return true;
        const diffMinutes = (currentDate.getTime() - lastDate.getTime()) / 1000 / 60;
        return diffMinutes > gapMinutes;
    };


    return (
        <div className="fixed bottom-0 right-10 w-96 flex flex-col items-center bg-gray-100 shadow-dark shadow-xl dark:bg-dark-gray-bg rounded-lg overflow-auto border dark:border-dark-gray border-gray-200">
            <div className="w-full px-4 flex items-center justify-between py-2 text-gray-100 dark:bg-dark-gray-bg bg-light-gray dark:shadow-xl border dark:border-dark-gray border-gray-200">
                <div className="font-semibold text-gray-900 dark:text-gray-50">Chat</div>
                <div className="flex items-center text-gray-900 dark:text-gray-50">
                    {chatBoxManager.isMinimized && <FaAngleUp onClick={toggleMinimize} className="cursor-pointer hover:text-gray-400" title="Maximize" />}
                    {!chatBoxManager.isMinimized && <FaAngleDown onClick={toggleMinimize} className="cursor-pointer hover:text-gray-400" title="Maximize" />}
                    <FaTimes onClick={() => { chatBoxManager.close(); }} className="cursor-pointer ml-2 hover:text-gray-400" title="Close" />
                </div>
            </div>

            <div className={`w-full flex-col overflow-clip ${chatBoxManager.isMinimized ? "h-0" : ""}`}>
                <div ref={messagesWrapperRef} className="w-full flex flex-col h-96 overflow-auto">
                    {
                        messagesManager.messages.map((m, index) => {
                            const currentTimestamp = new Date(m._createdAt);

                            const canShowDate = (isNewDay(lastTimestamp, currentTimestamp)) || (isNewHour(lastTimestamp, currentTimestamp) || isSignificantGap(lastTimestamp, currentTimestamp))
                            lastTimestamp = currentTimestamp;

                            const isSent = (m.user as User)._id == user._id;
                            const getDate = () => {
                                if (currentTimestamp >= (new Date(`${moment(moment.now()).format("DD-MM-YYYY")}`))) {
                                    return moment(m._createdAt).format("DD-MM-YYYY");
                                } else if (index == messagesManager.messages.length - 1) {
                                    return `${isSent ? "sent" : "received"} ${moment(m._createdAt).fromNow()}`
                                } else {
                                    return moment(m._createdAt).fromNow();
                                }
                            }

                            if (isSent) {
                                return (
                                    <div key={index} className="flex flex-col pr-2 w-full items-end my-1">
                                        <div className="w-2/3 flex flex-row items-center justify-end">
                                            <div className="bg-primary-color rounded-full rounded-br-none px-4 py-2 text-white text-sm mx-1">{m.message}</div>
                                        </div>
                                        <div className="w-full flex flex-row items-center">
                                            {
                                                (canShowDate && index == messagesManager.messages.length - 1) && (
                                                    <div className="w-full text-right text-gray-400 text-xs px-2">{getDate()}</div>
                                                )
                                            }
                                            {
                                                (!canShowDate && index == messagesManager.messages.length - 1) && (
                                                    <div className="w-full text-right text-gray-400 text-xs px-2">{getDate()}</div>
                                                )
                                            }
                                            {
                                                (canShowDate && index != messagesManager.messages.length - 1) && (
                                                    <div className="w-full text-center text-gray-400 text-xs px-2">{getDate()}</div>
                                                )
                                            }
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
                                            <div className="bg-gray-200 dark:bg-gray-100 rounded-full rounded-bl-none px-4 py-2 text-center text-gray-900 text-sm mx-1">{m.message}</div>
                                        </div>
                                        <div className="w-full flex flex-row items-center">
                                            {
                                                (canShowDate && index == messagesManager.messages.length - 1) && (
                                                    <div className="w-full pl-12 text-left text-gray-400 text-xs px-2">{getDate()}</div>
                                                )
                                            }
                                            {
                                                (!canShowDate && index == messagesManager.messages.length - 1) && (
                                                    <div className="w-full pl-12 text-left text-gray-400 text-xs px-2">{getDate()}</div>
                                                )
                                            }
                                            {
                                                (canShowDate && index != messagesManager.messages.length - 1) && (
                                                    <div className="w-full text-center text-gray-400 text-xs px-2">{getDate()}</div>
                                                )
                                            }
                                        </div>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
                <div className="w-full flex flex-row items-center p-2">
                    <input onKeyDown={(evt) => { if (evt.code === "Enter") { send(); } }} onChange={(evt) => setMessageContent(evt.target.value)} value={message.message} className="mr-2 px-4 py-2 flex-grow dark:bg-dark-gray bg-white border dark:border-none rounded-full dark:text-gray-50 text-gray-900 focus:outline-none placeholder:text-gray-400" type="text" placeholder="Type a message..." />
                    <button onClick={send} className="rounded-full bg-primary-color border dark:border-none py-2 px-4 text-xl text-sky-50 duration-300 active:scale-105"><FaPaperPlane /></button>
                </div>
            </div>
        </div>
    )
}