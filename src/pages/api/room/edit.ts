import { roomRepository } from "@/repositories";

export default async function handler(req, res) {
    if (req.method == "POST") {
        let userSession: UserSession = req.userSession;
        let room: Room = req.body;
        let room_: Room = await roomRepository.getRoomById(room._id);
        if (room_ && (room_.admin as User)._id == userSession.user_id) {
            let result = await roomRepository.updateRoomById(room._id, {
                name: room.name,
                privacy: room.privacy,
                password: room.privacy == 'private' ? room.password : '',
                categories: room.categories as RefDocument[],
            });

            res.status(200).json({
                status: "success",
                message: "room data edited successfully!",
                data: result
            });
        } else {
            res.status(200).json({
                status: "error",
                message: "you are not the admin!"
            });
        }
    } else {
        res.status(405).json({
            status: "error",
            message: "method not found!"
        });
    }
}
