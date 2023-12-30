import client from "@/database/client";

export default async function handler(req, res) {
    let { room_id } = req.query;
    let userSession: UserSession = req.userSession;
    let messages = await client.getMessages(room_id, userSession.user_id);

    res.status(200).json({ status: "success", data: messages });
}
