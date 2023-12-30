import { Server as HttpServer } from 'http';
import { Server as WSServer } from 'ws';
import { verifyToken } from '../utils/encryption';
import WSRoom from './WSRoom';
import db_client from '../database/client';
import ClientSocket from './ClientSocket';

export default function createWebSocketServer(server: HttpServer): WSServer {
    let ws: WSServer = process.env.NODE_ENV == "production" ? new WSServer({ server }, () => console.log('websocket server alive!')) : new WSServer({ port: 4000 }, () => console.log('websocket server alive on port:', 4000));
    let ONLINE_ROOMS: Map<string, WSRoom> = new Map();

    const host_url: string = process.env.HOST_URL || "http://localhost:4000";

    ws.on("connection", async (client: ClientSocket, request) => {
        let url: URL = new URL(host_url + "/" + request.url);
        let room_id: string = url.searchParams.get("room_id");
        let access_token: string = url.searchParams.get("access_token");

        if (!access_token) {
            client.close(client.CLOSED, "No access_token.");
            return;
        }

        let token_payload: JWTToken<AuthToken> = verifyToken(access_token);
        if (!token_payload) {
            client.close(client.CLOSED, "Bad access_token.");
            return;
        }

        let user: User = await db_client.getUser(token_payload.data.user_id);
        client.userSession = { access_token, user, user_id: user._id, username: user.username };

        let room: Room = await db_client.getRoomIfIn(room_id, user._id);
        if (!room) {
            client.close(client.CLOSED, 'Room does not exist.');
            return;
        }

        // client.member_has_access = await db_client.doMemberHasAccess(room_id, client.user.user_id, "control_video_player");

        let online_room: WSRoom = ONLINE_ROOMS.get(room._id);
        if (online_room == undefined) {
            ONLINE_ROOMS.set(room._id, new WSRoom(room));
        }

        online_room = ONLINE_ROOMS.get(room._id);

        client.broadcast = (eventName, payload) => {
            client.send(JSON.stringify({ eventName, payload }));
        }

        client.on('message', (data) => {
            let { eventName, payload } = JSON.parse(data.toString());
            client.emit(eventName, payload);
        });

        client.on("chat", async (payload: ChatEventPayload) => {
            let { message, type } = payload;
            let msg_doc = { _type: "messages", room: { _type: "reference", _ref: room_id }, user: { _type: "reference", _ref: client.userSession.user_id }, message, type };
            let message_ = await db_client.createMessage(msg_doc);
            let msg = await db_client.getMessageById(message_._id);
            online_room.broadcast(client, "chat", msg);
        });

        client.on("video_player", async (payload: VideoPlayerEventPayload) => {
            let { action } = payload;
            if (action != "sync") {
                // if (client.member_has_access)
                if (online_room.admin()._id == client.userSession.user_id) {
                    online_room.broadcast(client, "video_player", payload);
                }
            } else {
                online_room.send_to_admin("video_player", payload);
            }
        });

        client.on('close', (code, reason) => {
            console.log("client closed the connection: ", { code, reason });
        });

        online_room.new_connection(client);
    });

    return ws;
}

/*

    WebSocket Handler Protocol:
        data: { eventName, payload }
        
        eventName: "chat" || "video_player"

        payload: "chat" { message, type }
        payload: "video_player" { action, video_player_data }

        action: "play" || "pause" || "update" || "start" || "sync"

        video_player_data: "start" || "pause" || "play" || "update" { video_id, timestamp }
*/

