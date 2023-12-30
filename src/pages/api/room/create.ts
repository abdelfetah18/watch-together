import client from "@/database/client";

export default async function handler(req, res) {
    if (req.method == "POST") {
        let userSession: UserSession = req.userSession;
        let room: Room = req.body as Room;

        let errors = validateInput(room);

        if (errors.length > 0) {
            res.status(200).json({ status: "error", data: errors });
            return;
        }

        let room_with_same_name = await client.getRoom(room.name);
        if (room_with_same_name) {
            res.status(200).json({ status: "error", data: ["Room name already exists!"] });
        } else {
            let categories = [];
            for (let c of room.categories) {
                categories.push({ _type: "reference", _ref: c._id });
            }

            let room_doc = { _type: "room", name: room.name, creator: { _type: "reference", _ref: userSession.user_id }, admin: { _type: "reference", _ref: userSession.user_id }, privacy: room.privacy, password: room.privacy == 'private' ? room.password : '', categories };
            let createdRoom = await client.createRoom(room_doc);

            let member_doc = { _type: "member", user: { _type: "reference", _ref: userSession.user_id }, room: { _type: "reference", _ref: createdRoom._id }, permissions: ["control_video_player", "remove_members", "edit_room_info"] };
            await client.createMember(member_doc);

            res.status(200).json({ status: "success", data: createdRoom });
        }
    } else {
        res.status(405).json({ status: "error", data: ["method not found!"] });
    }
}

function validateInput(room: Room) {
    let errors: string[] = [];

    if (room.name.length == 0) {
        errors.push('Room name must not be empty');
    }

    if (room.bio.length == 0) {
        errors.push('Room description must not be empty');
    }

    if (room.privacy == 'private' && room.password.length == 0) {
        errors.push('Private rooms must have a password');
    }

    if (room.privacy != 'private' && room.privacy != 'public') {
        errors.push('Room privacy must be ever "private" or "public"');
    }

    return errors;
}