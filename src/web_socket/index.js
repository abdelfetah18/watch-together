var ws_server = require("ws");
var db_client = import("../database/client.mjs");
var { verifyToken } = require("../utils/encryption.js");
const Room = require("./Room.js");

function createWebSocketServer(server){
    let ws = process.env.NODE_ENV == "production" ? new ws_server.Server({ server },() => console.log('websocket server alive!')) : new ws_server.Server({ port:4000 },() => console.log('websocket server alive on port:', 4000));
    let ONLINE_ROOMS = new Map();

    const host_url = process.env.HOST_URL || "http://localhost:4000";

    ws.on("connection",async (client, request) => {
        let url = new URL(host_url+"/"+request.url);
        let room_id = url.searchParams.get("room_id");
        let access_token = url.searchParams.get("access_token");

        if(!access_token){
            client.close(client.CLOSED, "No access_token.");
            return;
        }
       
        let user = (await verifyToken(access_token)).payload.data;
        if(!user){
            client.close(client.CLOSED, "Bad access_token.");
            return;
        }

        client.user = user;
        let room = await (await db_client).default.getRoomIfIn(room_id, user.user_id);
        if(!room){
            client.close(client.CLOSED, 'Room does not exist.');
            return;
        }

        let online_room = ONLINE_ROOMS.get(room._id);
        if(online_room == undefined){
            let admin = await (await db_client).default.getRoomAdmin(room_id);
            console.log({ admin });
            ONLINE_ROOMS.set(room._id, new Room(room._id, admin._id));
        }
        online_room = ONLINE_ROOMS.get(room._id);

        client.broadcast = (eventName, payload) => {
            client.send(JSON.stringify({ eventName, payload }));
        }

        client.on('message',(data) => {
            let { eventName, payload } = JSON.parse(data.toString());
            console.log({ eventName, payload });

            client.emit(eventName, payload);
        });

        client.on("chat", async (payload) => {
            let { message, type } = payload;
            let msg_doc = { _type:"messages", room:{ _type:"reference", _ref: room_id }, user:{ _type:"reference", _ref: client.user.user_id }, message, type };
            let message_ = await (await db_client).default.createMessage(msg_doc);
            let msg = await (await db_client).default.getMessageById(message_._id);
            console.log({
                message_, msg
            })
            online_room.broadcast(client, "chat", JSON.stringify(msg));
        });

        client.on("video_player", async (payload) => {
            let { action } = payload;
            if(action != "sync"){
                let member_has_access = await (await db_client).default.doMemberHasAccess(room_id, client.user.user_id, "control_video_player");
                if(member_has_access)
                    online_room.broadcast(client, "video_player", payload);
            }else{
                online_room.send_to_admin("video_player", payload);
            }
        });

        client.on('close', ( code, reason) => {});

        online_room.new_connection(client);
    });

    return ws;
}

module.exports = createWebSocketServer;

/*

    WebSocket Handler Protocol:
        data: { eventName, payload }
        
        eventName: "chat" || "video_player"

        payload: "chat" { message, type }
        payload: "video_player" { action, video_player_data }

        action: "play" || "pause" || "update" || "start" || "sync"

        video_player_data: "start" || "pause" || "play" || "update" { video_id, timestamp }
*/

