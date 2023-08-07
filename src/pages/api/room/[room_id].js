import client from "@/database/client.mjs";

export default async function handler(req, res) {
    let user_id = req.user.data.user_id;
    let { room_id } = req.query;

    let room = await client.getRoomIfIn(room_id, user_id);
    if(room){
        res.status(200).json({ status:"success", data: room });
    }else{
        res.status(200).json({ status:"error", message: "You need to be member to view the room or that room does not exist." });
    }
}
  