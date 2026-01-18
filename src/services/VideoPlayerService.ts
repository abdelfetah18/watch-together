import Result from "@/utils/Result";
import axios from "axios";

export async function updateVideoPlayerById(
    roomId: string,
    videoPlayerId: string,
    updateVideoPlayerForm: UpdateVideoPlayer,
): Promise<Result<Record<string, string>, VideoPlayer>> {
    try {
        const response = await axios.patch<HttpResponseData<Room>>(`/api/room/${roomId}/video_player/${videoPlayerId}`, updateVideoPlayerForm);
        const body = response.data;
        return Result.success(body.data);
    } catch (error) {
        if (error.response) {
            const body = error.response.data;
            return Result.failure(body.data);
        }
    }
}