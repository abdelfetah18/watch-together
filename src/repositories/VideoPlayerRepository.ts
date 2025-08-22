import Repository from "./Repository";

export default class VideoPlayerRepository extends Repository {
    static DEFAULT_PROPS = `{
        _id,    
        is_playing,
        video_id,
        timestamp,
        _createdAt
    }`;

    async createVideoPlayer(): Promise<VideoPlayer> {
        return await this.sanityClient.create({
            _type: "video_player",
            video_id: "",
            timestamp: 0,
            is_playing: false,
        });
    }

    async updateVideoPlayerById(id: string, updateVideoPlayer: UpdateVideoPlayer): Promise<Room> {
        return await this.sanityClient.patch(id).set(updateVideoPlayer).commit();
    }
}