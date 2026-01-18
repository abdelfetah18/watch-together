import { roomRepository, videoPlayerRepository } from "@/repositories";

export default async function handler(req, res) {
    const userSession: UserSession = req.userSession;
    const { room_id, video_player_id } = req.query;

    if (req.method == "PATCH") {
        const room = await roomRepository.getRoomById(room_id);
        if ((room.admin as User)._id != userSession.user_id) {
            res.status(200).json({
                status: "error",
                message: "Only admin is allowed to do this action."
            });
            return;
        }

        const updateVideoPlayerForm = req.body as UpdateVideoPlayer;
        const result = await videoPlayerRepository.updateVideoPlayerById(video_player_id, updateVideoPlayerForm);

        res.status(200).json({
            status: "success",
            message: "video player updated successfully",
            data: result
        });
    }

    res.status(405).json({
        status: "error",
        message: "method not found!"
    });
}
