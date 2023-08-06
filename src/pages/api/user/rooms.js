import client from "@/database/client.mjs";

export default async function handler(req, res) {
    let user_id = req.user.data.user_id;
    let rooms = await client.getAlreadyInRooms(user_id);

    res.status(200).json({ status:"success", data: rooms });
}
  