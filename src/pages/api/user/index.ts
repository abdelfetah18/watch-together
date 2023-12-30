import client from "@/database/client";

export default async function handler(req, res) {
    let userSession: UserSession = req.userSession;

    let user = await client.getUser(userSession.user_id);
    if (user) {
        res.status(200).json({ status: "success", data: user });
    } else {
        res.status(200).json({ status: "error", message: 'user not exist' });
    }
}
