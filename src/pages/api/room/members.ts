import { roomMemberRepository } from "@/repositories";

export default async function handler(req, res) {
    let { room_id } = req.body;

    let room_members = await roomMemberRepository.getRoomMembersByRoomId(room_id);

    res.status(200).json({ status: "success", data: room_members });
}
