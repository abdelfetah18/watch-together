import { roomRepository } from "@/repositories";

export default async function handler(req, res) {
    if (req.method != "POST") {
        res.status(405).json({
            status: "error",
            message: "method not found!"
        });
        return;
    }

    const userSession: UserSession = req.userSession;
    const { room_id: roomId } = req.body;

    const room = await roomRepository.getRoomById(roomId);
    if (!room || (room.admin as User)._id != userSession.user_id) {
        res.status(200).json({
            status: "error",
            message: "you are not allowed!"
        });

        return;
    }

    const deletedRoom = roomRepository.deleteRoomById(roomId);
    res.status(200).json({
        status: "success",
        message: "deleted successfuly!",
        data: deletedRoom
    });
}
