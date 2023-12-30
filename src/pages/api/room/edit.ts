import client from "@/database/client";

export default async function handler(req, res) {
    if (req.method == "POST") {
        let userSession: UserSession = req.userSession;
        let room: Room = req.body;
        let room_: Room = await client.getRoomIfAdmin(room._id, userSession.user_id);
        if (room_) {
            let categories = [];
            for (let c of room.categories) {
                categories.push({ _type: "reference", _ref: c._id });
            }

            let new_doc = { name: room.name, privacy: room.privacy, password: room.privacy == 'private' ? room.password : '', categories };
            let result = await client.updateRoom(room._id, new_doc);
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
