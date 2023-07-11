import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FaEllipsisH } from "react-icons/fa"

export default function RoomInfo({ user, room, invite_token, ws, host_url }){
    const [invite_url,setInviteUrl] = useState((process.env.NODE_ENV === "production" ? "https://"+host_url : "http://localhost:3000")+"/room/invite?token="+invite_token);
    const inviteDiv = useRef();
    const [message,setMessage] = useState("");
    const [messages,setMessages] = useState([]);
    const messagesWrapper = useRef();

    useEffect(() => {
        messagesWrapper.current.scrollTo({ behavior: 'smooth', top: messagesWrapper.current.scrollHeight });
    },[messages]);

    useEffect(() => {
        axios.get("/api/room/chat?room_id="+room._id).then(res => {
            if(res.data.status == "success"){
                setMessages(res.data.data);
            }
        }).catch(err => console.log({ error: err }));
        if(ws){
            ws.addEventListener("msg",(ev) => {
                setMessages(state => {
                    return [...state,ev.payload]
                });
            });
            return () => {
                ws.removeEventListener("msg", (ev) => {
                    console.log("event listener removed.");
                },{});
            }
        }
    },[ws]);

    function copyInviteUrl(evt){
        inviteDiv.current.select();
        navigator.clipboard.writeText(invite_url);
    }

    function truncate( str, n, useWordBoundary ){
        if (str.length <= n) { return str; }
        const subString = str.slice(0, n-1); // the original check
        return (useWordBoundary
          ? subString.slice(0, subString.lastIndexOf(" "))
          : subString) + "...";
    }

    function sendMessage(){
        if(ws && ws.readyState === ws.OPEN){
          if(message.length > 0){
            var data = { target:"chat", room_id:room._id, data:{ type:"text",message } };
            ws.send(JSON.stringify(data));
            setMessages(state => {
              return [...state,{
                _createdAt: (new Date()).toString(),
                user,
                message,
                type:"text"
              }]
            });
            setMessage("");
          }
        }
    }

    return(
        <div className="w-1/4 bg-gray-800 h-full flex flex-col items-center">
            <div className="w-11/12 flex flex-col items-center h-full">
                <div className="flex flex-row w-full py-4">
                    <div className="flex flex-col items-center bg-gray-600 rounded-l">
                        <div className="w-28 h-28">
                            <img alt="profile_image" className="w-full h-full object-cover rounded-l" src={room.profile_image ?? "/thumb.png"} />
                        </div>
                    </div>
                    <div className="flex flex-col items-center flex-grow bg-gray-700 rounded-r py-4 px-4">
                        <div className="w-full font-mono text-base pb-2 text-white">{room.name}</div>
                        <div className="w-full font-mono text-sm font-medium text-green-600">0 online members</div>
                        <div className="w-full text-gray-300 font-mono text-sm">{room.total_members} members</div>
                    </div>
                </div>

                <div className="w-full flex flex-row items-center">
                    <div onClick={copyInviteUrl} className="cursor-pointer w-1/4 text-white text-center py-1 bg-green-500 rounded-l-lg font-bold font-mono">invite</div>
                    <input ref={inviteDiv} className="w-3/4 bg-gray-700 rounded-r-lg py-1 px-2 text-gray-500" onChange={() => null} type="text" value={truncate(invite_url,30)}/>
                </div>
 
                <div className="relative flex flex-col items-center w-full flex-grow bg-gray-900 rounded-lg my-4 overflow-auto">
                    <div ref={messagesWrapper} className="w-full flex flex-col flex-grow overflow-auto py-4">
                    {
                        messages.map((m,index) => {
                            if(m.user._id == user._id){
                                return(
                                    <div key={index} className="flex flex-col pr-2 w-full items-end my-1">
                                    <div className="w-2/3 flex flex-row items-center justify-end">
                                        <div className="bg-blue-400 rounded-lg rounded-br-none px-4 py-2 font-mono text-white text-sm mx-1">{m.message}</div>
                                    </div>
                                    <div className="flex flex-row items-center">
                                        <div className="font-mono text-gray-600 text-xs px-2 py-1">{(new Date(m._createdAt)).toLocaleTimeString("en",{ hour:"2-digit",minute:"2-digit"})}</div>
                                    </div>
                                    </div>
                                )
                            }else{
                                return(
                                    <div key={index} className="flex flex-col w-full items-start my-1">
                                    <div className="w-2/3 flex flex-row items-center">
                                        <div className="py-1 px-1">
                                        <img alt="profile_image" className="w-8 h-8 rounded-full" src={m.user.profile_image ? m.user.profile_image : "/user.png"} />
                                        </div>
                                        <div className="bg-gray-600 rounded-lg rounded-bl-none px-4 py-2 text-center text-slate-200 text-sm mx-1">{m.message}</div>
                                    </div>
                                    <div className="flex flex-row items-center">
                                        <div className="font-mono text-gray-600 text-xs px-2">{(new Date(m._createdAt)).toLocaleTimeString("en",{ hour:"2-digit",minute:"2-digit"})}</div>
                                    </div>
                                    </div>
                                )
                            }
                        })
                    }
                    </div>
                    <div className="w-full flex flex-row items-center">
                    <input onKeyDown={(evt) => { if(evt.code === "Enter"){ sendMessage() }}} onChange={(evt) => setMessage(evt.target.value)} value={message} className="px-4 py-2 rounded-b-lg w-full font-mono bg-gray-600 text-gray-200 focus:outline-none" type="text" placeholder="type a message..." />
                    </div>
                </div>
            </div>
        </div>
    )
}