import { useEffect } from "react";
import { verifyToken } from "@/utils/encryption";
import client from "@/database/client";

export async function getServerSideProps({ req, query }) {
    const token = query.token;
    let isValid: JWTToken<RoomInviteToken> = verifyToken(token);
    if (isValid && isValid.type === "room_invite") {
        let room_id = isValid.data.room_id;
        let userSession: UserSession = req.userSession;
        let room = await client.getRoomIfIn(room_id, userSession.user_id);

        if (!room) {
            let member_doc = { _type: "member", user: { _type: "reference", _ref: userSession.user_id }, room: { _type: "reference", _ref: room_id }, permissions: ["control_video_player", "remove_members", "edit_room_info"] };
            await client.createMember(member_doc);

            return {
                redirect: {
                    destination: '/room/' + room_id,
                    permanent: false
                }
            }
        } else {
            return {
                props: { status: "error", message: "Room not found or you already in." }
            }
        }
    } else {
        return {
            redirect: {
                destination: '/profile',
                permanent: false
            }
        }
    }

}


export default function Invite({ status, message }) {

    useEffect(() => {
        setTimeout(() => window.location.href = "/profile", 3000);
    }, []);

    return (
        <div className="w-screen h-screen flex flex-row items-center justify-center">
            <div className="text-lg font-bold text-red-500 px-4">{status}:</div>
            <div className="text-lg font-semibold">{message}</div>
        </div>
    )
}