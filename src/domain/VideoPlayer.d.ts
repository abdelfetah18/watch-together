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

enum PlayerState {
    UNSTARTED = -1,
    ENDED = 0,
    PLAYING = 1,
    PAUSED = 2,
    BUFFERING = 3,
    CUED = 5,
}

interface VideoPlayerObject {
    start(videoId: string);
    play();
    pause();
    update(timestamp: number);
    getCurrentTime(): number;
    getPlayerState(): PlayerState;
}