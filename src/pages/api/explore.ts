import { roomRepository } from "@/repositories";

export default async function handler(req, res) {
    const userSession: UserSession = req.userSession;
    const rooms = await roomRepository.getPublicRoomsUserIsNotMemberOf(userSession.user_id);
    res.status(200).json({ status: "success", data: rooms });
}
