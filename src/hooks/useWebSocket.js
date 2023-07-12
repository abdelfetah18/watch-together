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
        
        web_socket.emit = (eventName,payload) => {
            let data = JSON.stringify({ eventName,payload });
            web_socket.send(data);
        }

        web_socket.onmessage = (evt) => {
            let { eventName, payload } = JSON.parse(evt.data);
            web_socket.dispatchEvent(new CustomEvent(eventName,{ detail: payload }))
        }

        setWS(web_socket);
    },[]);

    return ws;
}