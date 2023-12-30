import ClientSocket from "./ClientSocket";

export default class WSRoom {
    room: Room;
    clients: ClientSocket[];

    constructor(room: Room) {
        this.room = room;
        this.clients = [];
    }

    admin(): User {
        return this.room.admin as User;
    }

    new_connection(client: ClientSocket): void {
        this.clients.push(client);
    }

    close_connection(client: ClientSocket): void {
        this.clients = this.clients.filter(c => c.userSession.user_id != client.userSession.user_id);
    }

    send_to_admin(eventName: WSEventNames, payload: any): void {
        for (let c of this.clients) {
            if (c.userSession.user_id == this.admin()._id) {
                c.broadcast(eventName, payload);
            }
        }
    }

    broadcast(client: ClientSocket, eventName: WSEventNames, payload: any) {
        for (let c of this.clients) {
            if (c.userSession.user_id != client.userSession.user_id)
                c.broadcast(eventName, payload);
        }
    }
}