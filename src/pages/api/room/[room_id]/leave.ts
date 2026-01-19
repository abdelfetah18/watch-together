import { roomMemberRepository, roomRepository } from "@/repositories";

export default async function handler(req, res) {
    const userSession: UserSession = req.userSession;
    const { room_id } = req.query;

    if (req.method == "POST") {
        const room = await roomRepository.getRoomById(room_id);
        if (!room) {
            res.status(200).json({ status: "error", message: "Room does not exist." });
            return;
        }

        if ((room.admin as User)._id == userSession.user_id) {
            res.status(200).json({ status: "error", message: "Admin cannot leave a room." });
            return;
        }

        await roomMemberRepository.deleteRoomMemberById(room_id, userSession.user_id);
        res.status(200).json({ status: "success", data: room });
        return;
    }

    res.status(405).json({
        status: "error",
        message: "method not found!"
    });
}
