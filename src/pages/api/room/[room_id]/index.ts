import { messagesRepository, roomMemberRepository, roomRepository, videoPlayerRepository } from "@/repositories";

export default async function handler(req, res) {
    const userSession: UserSession = req.userSession;
    const { room_id } = req.query;

    if (req.method == "GET") {
        const room = await roomRepository.getRoomById(room_id);
        if (!room) {
            res.status(200).json({ status: "error", message: "Room does not exist." });
            return;
        }

        const roomMember = await roomMemberRepository.getRoomMembersByUserId(room_id, userSession.user_id);
        if (roomMember) {
            res.status(200).json({ status: "success", data: room });
        } else {
            res.status(200).json({ status: "error", message: "You need to be member to view the room or that room does not exist." });
        }

        return;
    }

    if (req.method == "PATCH") {
        // Check if user is admin
        const room = await roomRepository.getRoomById(room_id);
        if ((room.admin as User)._id != userSession.user_id) {
            res.status(200).json({
                status: "error",
                message: "Only admin can update a room"
            });
            return;
        }

        const updateRoomForm = req.body as UpdateRoomForm;
        const result = await roomRepository.updateRoomById(room_id, {
            name: updateRoomForm.name,
            bio: updateRoomForm.bio,
            privacy: updateRoomForm.privacy,
            password: updateRoomForm.privacy == 'private' ? room.password : '',
            categories: updateRoomForm.categories,
            video_player: updateRoomForm.video_player,
            profile_image: updateRoomForm.profile_image,
        });

        res.status(200).json({
            status: "success",
            message: "room data edited successfully!",
            data: result
        });
    }

    if (req.method == "DELETE") {
        const room = await roomRepository.getRoomById(room_id);
        if (!room || (room.admin as User)._id != userSession.user_id) {
            res.status(200).json({
                status: "error",
                message: "you are not allowed!"
            });

            return;
        }

        await Promise.all([
            await messagesRepository.deleteRoomMessages(room_id),
            await roomMemberRepository.deleteRoomMembers(room_id),
        ]);

        const deletedRoom = await roomRepository.deleteRoomById(room_id);
        await videoPlayerRepository.deleteVideoPlayerById(room.video_player._id);

        res.status(200).json({
            status: "success",
            message: "deleted successfuly!",
            data: deletedRoom
        });
    }

    res.status(405).json({
        status: "error",
        message: "method not found!"
    });
}
