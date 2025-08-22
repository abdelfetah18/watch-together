import { Server as HttpServer } from 'http';
import { Server as WSServer } from 'ws';
import { verifyToken } from '../utils/encryption';
import WSRoom from './WSRoom';
import ClientSocket from './ClientSocket';
import { messagesRepository, roomRepository, userRepository } from '../repositories';

export default function createWebSocketServer(server: HttpServer): WSServer {
    let ws: WSServer = process.env.NODE_ENV == "production" ? new WSServer({ server }, () => console.log('websocket server alive!')) : new WSServer({ port: 4000 }, () => console.log('websocket server alive on port:', 4000));
    let ONLINE_ROOMS: Map<string, WSRoom> = new Map();

    const host_url: string = process.env.HOST_URL || "http://localhost:4000";

    ws.on("connection", async (client: ClientSocket, request) => {
        let url: URL = new URL(host_url + "/" + request.url);
        let room_id: string = url.searchParams.get("room_id");
        let access_token: string = url.searchParams.get("access_token");

        if (!access_token) {
            client.close(client.CLOSING, "No access_token.");
            return;
        }

        let token_payload: JWTToken<AuthToken> = verifyToken(access_token);
        if (!token_payload) {
            client.close(client.CLOSING, "Bad access_token.");
            return;
        }

        const user: User = await userRepository.getUserById(token_payload.data.user_id);
        client.userSession = { access_token, user, user_id: user._id, username: user.username };

        let room: Room = await roomRepository.getRoomById(room_id);
        if (!room) {
            client.close(client.CLOSING, 'Room does not exist.');
            return;
        }

        // FIXME: Check if user is a member of that room

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
            let message_ = await messagesRepository.createMessage({
                room: {
                    _type: "reference",
                    _ref: room_id
                },
                user: {
                    _type: "reference",
                    _ref: client.userSession.user_id
                },
                message,
                type
            });

            let msg = await messagesRepository.getMessageById(message_._id);
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

