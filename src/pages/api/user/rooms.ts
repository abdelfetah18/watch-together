import client from "@/database/client";

export default async function handler(req, res) {
    let userSession: UserSession = req.userSession;
    let rooms = await client.getAlreadyInRooms(userSession.user_id);

    res.status(200).json({ status:"success", data: rooms });
}
  