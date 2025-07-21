import { roomRepository } from "@/repositories";

export default async function handler(req, res) {
    let { query } = req.query;
    let rooms = await roomRepository.searchPublicRoomsByNameMatch(query);
    res.status(200).json({ status: "success", data: rooms });
}
