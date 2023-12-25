import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FaUserPlus, FaEdit, FaUsers, FaPaperPlane } from "react-icons/fa"

export default function RoomInfo({ user, room, invite_token, ws, host_url }) {
    const [invite_url, setInviteUrl] = useState((process.env.NODE_ENV === "production" ? "https://" + host_url : "http://localhost:3000") + "/room/invite?token=" + invite_token);
    const inviteDiv = useRef();
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const messagesWrapper = useRef();

    useEffect(() => {
        messagesWrapper.current.scrollTo({ behavior: 'smooth', top: messagesWrapper.current.scrollHeight });
    }, [messages]);

    useEffect(() => {
        axios.get("/api/room/chat?room_id=" + room._id).then(res => {
            if (res.data.status == "success") {
                setMessages(res.data.data);
            }
        }).catch(err => console.log({ error: err }));
        if (ws) {
            ws.addEventListener("chat", ({ detail: payload }) => {
                setMessages(state => {
                    return [...state, payload]
                });
            });
            return () => {
                ws.removeEventListener("chat", (ev) => {
                    console.log("event listener removed.");
                }, {});
            }
        }
    }, [ws]);

    function copyInviteUrl(evt) {
        inviteDiv.current.select();
        navigator.clipboard.writeText(invite_url);
    }

    function truncate(str, n, useWordBoundary) {
        if (str.length <= n) { return str; }
        const subString = str.slice(0, n - 1); // the original check
        return (useWordBoundary
            ? subString.slice(0, subString.lastIndexOf(" "))
            : subString) + "...";
    }

    function sendMessage() {
        if (ws && ws.readyState === ws.OPEN) {
            if (message.length > 0) {
                let data = { eventName: "chat", payload: { type: "text", message } };
                ws.send(JSON.stringify(data));
                setMessages(state => {
                    return [...state, {
                        _createdAt: (new Date()).toString(),
                        user,
                        message,
                        type: "text"
                    }]
                });
                setMessage("");
            }
        }
    }

    return (
        <div className="w-1/4 bg-gray-800 h-full flex flex-col items-center">
            <div className="w-11/12 flex flex-col items-center h-full">
                <div className="flex flex-row w-full py-4">
                    <div className="flex flex-col items-center rounded-l-lg">
                        <div className="w-28 h-28">
                            <img alt="profile_image" className="w-full h-full object-cover rounded-l-lg" src={room.profile_image ? room.profile_image + "?h=300&w=400&fit=crop&crop=center" : "/profile_4_3.png"} />
                        </div>
                    </div>
                    <div className="flex flex-col items-center flex-grow bg-gray-700 rounded-r-lg py-4 px-4">
                        <div className="w-full font-mono text-base text-white">{room.name}</div>
                        <div className="w-full font-mono text-sm text-gray-500 mb-4">{room.bio || 'Bio'}</div>
                        <div className="self-start bg-gray-800 px-4 rounded-full text-gray-300 text-sm font-mono flex items-center">
                            <FaUsers className="mr-2" />
                            <span>{room.total_members}</span>
                        </div>
                    </div>
                </div>

                <a href={"/room/" + room._id + "/edit"} className="py-2 w-full flex items-center justify-center rounded-lg bg-sky-800 hover:bg-sky-700 cursor-pointer mb-4 text-xs text-gray-50">
                    <FaEdit />
                    <div className="ml-2 font-semibold">EDIT ROOM</div>
                </a>

                <div className="w-full flex flex-row items-center">
                    <div onClick={copyInviteUrl} className="cursor-pointer w-1/6 text-gray-50 text-center py-1 bg-green-500 hover:bg-green-600 rounded-l-lg font-semibold font-mono flex flex-col items-center" title="Click to copy the link"><FaUserPlus className="text-2xl" /></div>
                    <input ref={inviteDiv} className="w-5/6 bg-gray-700 rounded-r-lg py-1 px-2 text-gray-500 cursor-pointer hover:text-gray-400 hover:bg-gray-600" title="Click to copy the link" onClick={copyInviteUrl} type="text" value={truncate(invite_url, 30)} disabled />
                </div>

                <div className="relative flex flex-col items-center w-full flex-grow bg-gray-900 rounded-lg my-4 overflow-auto">
                    <div ref={messagesWrapper} className="w-full flex flex-col flex-grow overflow-auto py-4">
                        {
                            messages.map((m, index) => {
                                if (m.user._id == user._id) {
                                    return (
                                        <div key={index} className="flex flex-col pr-2 w-full items-end my-1">
                                            <div className="w-2/3 flex flex-row items-center justify-end">
                                                <div className="bg-blue-400 rounded-lg rounded-br-none px-4 py-2 font-mono text-white text-sm mx-1">{m.message}</div>
                                            </div>
                                            <div className="flex flex-row items-center">
                                                <div className="font-mono text-gray-600 text-xs px-2 py-1">{(new Date(m._createdAt)).toLocaleTimeString("en", { hour: "2-digit", minute: "2-digit" })}</div>
                                            </div>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div key={index} className="flex flex-col w-full items-start my-1">
                                            <div className="w-2/3 flex flex-row items-center">
                                                <div className="py-1 px-1">
                                                    <img alt="profile_image" className="w-8 h-8 rounded-full" src={m.user.profile_image ? m.user.profile_image + "?h=100&w=100&fit=crop&crop=center" : "/profile_1_1.png"} />
                                                </div>
                                                <div className="bg-gray-600 rounded-lg rounded-bl-none px-4 py-2 text-center text-slate-200 text-sm mx-1">{m.message}</div>
                                            </div>
                                            <div className="flex flex-row items-center">
                                                <div className="font-mono text-gray-600 text-xs px-2">{(new Date(m._createdAt)).toLocaleTimeString("en", { hour: "2-digit", minute: "2-digit" })}</div>
                                            </div>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                    <div className="w-full flex flex-row items-center rounded-b-lg bg-gray-700">
                        <input onKeyDown={(evt) => { if (evt.code === "Enter") { sendMessage() } }} onChange={(evt) => setMessage(evt.target.value)} value={message} className="px-4 py-2  w-full font-mono bg-transparent text-gray-200 focus:outline-none" type="text" placeholder="Type a message..." />
                        <button onClick={sendMessage} className="bg-sky-700 hover:bg-sky-800 h-full px-4 text-xl text-sky-50 uppercase"><FaPaperPlane /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}