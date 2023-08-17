import client from "@/database/client.mjs";

export default async function handler(req, res) {
    let { query } = req.query;
    let rooms = await client.searchForRoom(query);
    res.status(200).json({ status:"success", data: rooms });
}
  