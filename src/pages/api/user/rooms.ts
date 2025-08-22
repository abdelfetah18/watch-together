import { roomRepository } from "@/repositories";

export default async function handler(req, res) {
    const userSession: UserSession = req.userSession;
    console.log({userSession})
    const rooms = await roomRepository.getRoomsUserIsMemberOf(userSession.user_id);
    console.log({rooms})

    res.status(200).json({ status: "success", data: rooms });
}
