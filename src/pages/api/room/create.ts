import { roomMemberRepository, roomRepository, videoPlayerRepository } from "@/repositories";

export default async function handler(req, res) {
    if (req.method != "POST") {
        res.status(405).json({ status: "error", data: ["method not found!"] });
        return
    }

    const userSession: UserSession = req.userSession;
    const room: Room = req.body as Room;

    const errors = validateInput(room);
    if (Object.keys(errors).length > 0) {
        res.status(400).json({ status: "error", data: errors });
        return;
    }

    const roomWithSameName = await roomRepository.getRoomByName(room.name);
    if (roomWithSameName) {
        res.status(400).json({ status: "error", data: { name: "room with that name already exists." } });
        return;
    }

    const videoPlayer = await videoPlayerRepository.createVideoPlayer();
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
        categories: room.categories as RefDocument[],
        video_player: {
            _type: "reference",
            _ref: videoPlayer._id,
        },
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
    let errors: Record<string, string> = {};

    if (room.name.length == 0) {
        errors["name"] = "Name field is required.";
    }

    if (room.bio.length == 0) {
        errors["bio"] = "Bio field is required.";
    }

    if (room.privacy == 'private' && room.password.length == 0) {
        errors["privacy"] = "Privacy field is required.";
    }

    if (room.privacy != 'private' && room.privacy != 'public') {
        errors["privacy"] = "Privacy field can be ever 'private' or 'public'.";
    }

    if (room.privacy == "private" && room.password.length == 0) {
        errors["password"] = "The room privacy is set to private so Password field is required.";
    }

    if (room.categories.length == 0) {
        errors["categories"] = "At least add one category.";
    }

    return errors;
}