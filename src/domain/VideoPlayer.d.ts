interface VideoPlayer {
    _id: string;
    video_id: string;
    timestamp: number;
    is_playing: boolean;
    _createdAt: string;
}

interface UpdateVideoPlayer {
    video_id: string;
    timestamp: number;
    is_playing: boolean;
}