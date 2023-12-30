type WSEventNames = "chat" | "video_player";

type VideoPlayerAction = "play" | "pause" | "update" | "start" | "sync";

interface VideoPlayerData {
    video_url: string;
    timestamp: number;
};

interface VideoPlayerEventPayload {
    action: VideoPlayerAction;
    data: VideoPlayerData;
};

type ChatEventPayload = Message;
