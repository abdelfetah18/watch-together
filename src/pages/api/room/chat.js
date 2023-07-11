import client from "@/database/client.mjs";

export default async function handler(req, res) {
    let { room_id } = req.query;
    let user_id = req.user.data.user_id;
    let messages = await client.getMessages(room_id, user_id);
    console.log({ messages })
    res.status(200).json({ status:"success", data: messages });
}
  