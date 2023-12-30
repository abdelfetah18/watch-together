import client from "@/database/client";

export default async function handler(req, res) {
    let { room_id } = req.body;

    let room_members = await client.getRoomMembers(room_id);

    res.status(200).json({ status: "success", data: room_members });
}
