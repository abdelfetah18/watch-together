import client from "@/database/client";

export default async function handler(req, res) {
    if (req.method == "POST") {
        let userSession: UserSession = req.userSession;
        let { room_id } = req.body;
        let room = await client.getRoomIfAdmin(room_id, userSession.user_id);
        if (room) {
            let result = await client.deleteRoom(room_id);
            res.status(200).json({
                status: "success",
                message: "deleted successfuly!",
                data: result
            });
        } else {
            res.status(200).json({
                status: "error",
                message: "you are not allowed!"
            });
        }
    } else {
        res.status(405).json({
            status: "error",
            message: "method not found!"
        });
    }
}
