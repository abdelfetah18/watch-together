import { roomMemberRepository, roomRepository } from "@/repositories";

export default async function handler(req, res) {
    if (req.method != "POST") {
        res.status(405).json({ status: "error", data: ["method not found!"] });
        return
    }

    const userSession: UserSession = req.userSession;
    const room: Room = req.body as Room;

    const errors = validateInput(room);
    if (errors.length > 0) {
        res.status(200).json({ status: "error", data: errors });
        return;
    }

    const roomWithSameName = await roomRepository.getRoomByName(room.name);
    if (roomWithSameName) {
        res.status(200).json({ status: "error", data: ["Room name already exists!"] });
        return;
    }

    const categories: RefDocument[] = [];
    for (const category of room.categories) {
        categories.push({
            _type: "reference",
            _ref: category._id
        });
    }

    const createdRoom = await roomRepository.createRoom({
        name: room.name,
        bio: room.bio,
        creator: {
            _type: "reference",
            _ref: userSession.user_id,
        },
        admin: {
            _type: "reference",
            _ref: userSession.user_id,
        },
        privacy: room.privacy,
        password: room.privacy == 'private' ? room.password : '',
        categories,
    });

    await roomMemberRepository.createMember({
        user: {
            _type: "reference",
            _ref: userSession.user_id,
        },
        room: {
            _type: "reference",
            _ref: createdRoom._id
        },
        permissions: ["control_video_player", "remove_members", "edit_room_info"],
    });

    res.status(200).json({ status: "success", data: createdRoom });
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