import client from "@/database/client";

export default async function handler(req, res) {
    let userSession: UserSession = req.userSession;
    let { room_id } = req.query;

    let room = await client.getRoomIfIn(room_id, userSession.user_id);
    if (room) {
        res.status(200).json({ status: "success", data: room });
    } else {
        res.status(200).json({ status: "error", message: "You need to be member to view the room or that room does not exist." });
    }
}
