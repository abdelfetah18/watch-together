import { roomRepository } from "@/repositories";

export default async function handler(req, res) {
    let userSession: UserSession = req.userSession;
    let { room_id } = req.query;

    let room = await roomRepository.getRoomById(room_id);
    if (room && (room.admin as User)._id == userSession.user_id) {
        res.status(200).json({ status: "success", data: room });
    } else {
        res.status(200).json({ status: "error", message: "You need to be member to view the room or that room does not exist." });
    }
}
