import { useEffect, useState } from "react";
import { EventEmitter } from "ws";

export default function useWebSocket(url){
    const [ws,setWS] = useState(null);

    useEffect(() => {
        let web_socket = new WebSocket(url);
        
        web_socket.onopen = (ev) => {
            console.log("web_socket connection is opened.");
        }

        web_socket.onerror = (ev) => {
            console.log("web_socket error:", ev);
        }
        
        web_socket.onclose = (ev) => {
            console.log("web_socket connection is closed.");
        }
        
        web_socket.onmessage = (ev) => {
            try {
                let payload = JSON.parse(ev.data);
                if(payload.target === "chat"){
                    let event = new Event("msg");
                    event.payload = {
                        _createdAt: (new Date()).toString(),
                        user:payload.data.user,
                        message:payload.data.message,
                        type:payload.data.message
                    };
                    web_socket.dispatchEvent(event);
                }
                
                if(payload.target === "video_player"){
                    let event = new Event("recv_payload");
                    event.payload = payload;
                    web_socket.dispatchEvent(event);
                }
                
                if(payload.target === "state_ready"){
                    let init_payload = { target:"video_player", data:{ action:"sync", data:{}}};
                    let event = new Event("init_payload");
                    event.payload = init_payload;
                    web_socket.dispatchEvent(event);
                }
            }catch(err){
                web_socket.close();
            }
        }

        setWS(web_socket);
    },[]);

    return ws;
}