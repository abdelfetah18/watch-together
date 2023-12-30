import WS from "ws";

export default class ClientSocket extends WS {
    userSession: UserSession;

    broadcast(eventName: WSEventNames, payload: any): void {
        this.send(JSON.stringify({ eventName, payload }));
    }
};