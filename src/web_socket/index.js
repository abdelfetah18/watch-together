var ws_server = require("ws");
var db_client = import("../database/client.mjs");
var { verifyToken } = require("../utils/encryption.js");

class Rooms {
    constructor(){
        this.rooms = new Map();
    }

    getRoom(room_id){
        return this.rooms.get(room_id);
    }

    joinRoom(room_id,client){
        let r = this.getRoom(room_id);
        if(r){
            this.rooms.set(room_id,[...r,client]);
        }else{
            this.rooms.set(room_id,[client]);
        }
    }

    leaveRoom(room_id,client_id){
        let r = this.getRoom(room_id);
        if(r){
            let list = [];
            for(let i = 0; i < r.length; i++){
                if(r[i].client_id != client_id){
                    list.push(r[i]);
                }
            }
            this.rooms.delete(room_id);
            this.rooms.set(room_id,list);
        }
    }

    getRoomUsers(room_id){
        return this.getRoom(room_id).length;
    }

    broadcastMessage(room_id,user_id,payload){
        let clients = this.getRoom(room_id);
        if(clients){
            for(let i = 0; i < clients.length; i++){
                if(user_id != clients[i].user.user_id){
                    clients[i].send(payload);
                }
            }
        }
    }
}

/*
    1. User establish connection.
    2. User send access_token.
    3. If User is good then respond with good.
    4. User send room_id to join.
    5. If User can join then add him to the room clients.

    If non the steps above are good then close the connection.


    Protocol Struct:
        action: 'auth' | 'msg'.
        data: (access_token, room_id), msg_obj.
*/

function createWebSocketServer(server){
    let ws = process.env.NODE_ENV == "production" ? new ws_server.Server({ server },() => console.log('websocket server alive!')) : new ws_server.Server({ port:4000 },() => console.log('websocket server alive on port:', 4000));
    let rooms = new Rooms();

    const host_url = process.env.HOST_URL || "http://localhost:4000";

    ws.on("connection",async (client, request) => {
        let url = new URL(host_url+"/"+request.url);
        let room_id = url.searchParams.get("room_id");
        let access_token = url.searchParams.get("access_token");

        if(!access_token){
            client.close(client.CLOSED, "No access_token.");
            return;
        }

        try {
            let user = (await verifyToken(access_token)).payload.data;
            if(user){
                client.user = user;
                let room = await (await db_client).default.getRoomIfIn(room_id, user.user_id);
                if(room){
                    rooms.joinRoom(room._id, client);
                    let response = JSON.stringify({ action: 'auth', data: { status: 'success', message: 'authentication success.' }});
                    client.send(response);
                }else{
                    client.close(404, 'bad room_id');
                }
            }else{
                throw "bad access_token";
            }
        } catch(err){
            client.close(404, 'bad access_token');
            return;
        }

        client.on('message', async (data, isBinary) => {
            let payload = JSON.parse(data.toString());
            if(payload.target == 'chat'){
                let _user = await (await db_client).default.getUser(client.user.user_id);
                payload.data.user = _user;
                if(client.user){
                    let msg_doc = { _type:"messages",room:{ _type:"reference", _ref: room_id }, user:{ _type:"reference", _ref: client.user.user_id },message:payload.data.message,type:payload.data.type };
                    let message = await (await db_client).default.createMessage(msg_doc);
                    rooms.broadcastMessage(room_id, client.user.user_id, JSON.stringify(payload));
                }else{
                    client.close(404, 'bad connection');
                }                    
            }

            if(payload.target === "video_player" && payload.data.action !== "sync"){
                let member_has_access = await (await db_client).default.doMemberHasAccess(room_id, client.user.user_id, "control_video_player");
                if(member_has_access){
                    rooms.broadcastMessage(room_id, client.user.user_id, data.toString());
                }
            }

            if(payload.target === "video_player" && payload.data.action == "sync"){
                let get_admin = await (await db_client).default.getRoom(room_id);
                if(get_admin){
                    let admin_id = get_admin.admin._id;
                    rooms.broadcastMessage(room_id, client.user.user_id, data.toString());
                }
            }
        });

        client.on('close', ( code, reason) => {

        });
        // This indicate that the client is good to go maybe.
        client.send(JSON.stringify({ target:"state_ready",data:{} }));
     });

    return ws;
}

module.exports = createWebSocketServer;

/*

{
    target: "chat" || "video_player",
    room_id:"",
    data: chat {
        user_id,type,message
    },

    video_player {
        action: "play" || "pause" || "update" || "start",
        data: start{ video_id }, update{ video_id,timestamp }
    }
}

*/