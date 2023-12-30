import { generateToken } from "@/utils/encryption";

export default async function handler(req, res) {
    let { room_id } = req.body;
    let userSession: UserSession = req.userSession;

    let payload: JWTToken<RoomInviteToken> = { type: "room_invite", data: { room_id, inviter_id: userSession.user_id } };
    let invite_token = generateToken(payload);

    let invite_url = `http://localhost:3000/room/invite?token=${invite_token}`;

    res.status(200).json({ status: "success", data: invite_url });
}
