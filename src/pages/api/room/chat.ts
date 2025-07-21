import { messagesRepository } from "@/repositories";

export default async function handler(req, res) {
    const { room_id } = req.query;

    const userSession: UserSession = req.userSession;
    const messages = await messagesRepository.listMessagesForRoomMember(room_id, userSession.user_id);

    res.status(200).json({ status: "success", data: messages });
}
