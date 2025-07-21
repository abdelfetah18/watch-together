import { roomMemberRepository, roomRepository } from "@/repositories";

export default async function handler(req, res) {
    if (req.method != "POST") {
        res.status(405).json({
            status: "error",
            message: "method not found!"
        });

        return;
    }

    // TODO: Check if user already in the room.
    const userSession: UserSession = req.userSession;
    const { room_id: roomId } = req.body;
    const room = await roomRepository.getRoomById(roomId);

    if (!room) {
        res.status(200).json({
            status: "error",
            message: "room not exists!"
        });
        return;
    }

    const createMember = await roomMemberRepository.createMember({
        user: {
            _type: "reference",
            _ref: userSession.user_id
        },
        room: {
            _type: "reference",
            _ref: roomId
        },
        permissions: ["control_video_player", "remove_members", "edit_room_info"],
    });

    res.status(200).json({
        status: "success",
        message: "new members!",
        data: createMember
    });
}
