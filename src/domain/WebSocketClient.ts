export interface ChatEvent extends CustomEvent {
    details: ChatEventPayload;
};

export interface VideoPlayerEvent extends CustomEvent {
    details: VideoPlayerEventPayload
};

export interface WSEvent extends WebSocketEventMap {
    chat: ChatEvent;
    video_player: VideoPlayerEvent;
};

export class WebSocketClient {
    private ws: WebSocket;
    constructor(ws: WebSocket) {
        this.ws = ws;
        this.ws.onmessage = (evt) => {
            let { eventName, payload } = JSON.parse(evt.data);
            this.ws.dispatchEvent(new CustomEvent(eventName, { detail: payload }))
        }
    }

    emit<Payload>(eventName: keyof WSEvent, payload: Payload): void {
        let data = JSON.stringify({ eventName, payload });
        this.ws.send(data);
    }

    addEventListener<K extends keyof WSEvent>(type: K, listener: (this: WebSocket, ev: WSEvent[K]) => any, options?: boolean | AddEventListenerOptions): void {
        this.ws.addEventListener(type, listener, options);
    }

    send<Payload>(eventName: keyof WSEvent, payload: Payload) {
        this.ws.send(JSON.stringify({ eventName, payload }));
    }
};