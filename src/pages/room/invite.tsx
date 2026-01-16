import { useEffect } from "react";
import { verifyToken } from "@/utils/encryption";
import { roomMemberRepository, roomRepository } from "@/repositories";

export async function getServerSideProps({ req, query }) {
    const token = query.token;
    const isValid: JWTToken<RoomInviteToken> = verifyToken(token);

    if (!isValid) {
        return {
            redirect: {
                destination: '/explore',
                permanent: false
            }
        };
    }

    const roomId = isValid.data.room_id;
    const userSession: UserSession = req.userSession;
    const room = await roomRepository.getRoomById(roomId);

    if (room && (room.admin as User)._id == userSession.user_id) {
        return {
            props: { status: "error", message: "Room not found or you already in." }
        }
    }

    await roomMemberRepository.createMember({
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

    return {
        redirect: {
            destination: '/room/' + roomId,
            permanent: false
        }
    }
}


export default function Invite({ status, message }) {

    useEffect(() => {
        setTimeout(() => window.location.href = "/explore", 3000);
    }, []);

    return (
        <div className="w-screen h-screen flex flex-row items-center justify-center">
            <div className="text-lg font-bold text-red-500 px-4">{status}:</div>
            <div className="text-lg font-semibold">{message}</div>
        </div>
    )
}