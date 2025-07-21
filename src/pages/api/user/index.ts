import { userRepository } from "@/repositories";

export default async function handler(req, res) {
    const userSession: UserSession = req.userSession;

    const user = await userRepository.getUserById(userSession.user_id);
    if (user) {
        res.status(200).json({ status: "success", data: user });
    } else {
        res.status(200).json({ status: "error", message: 'user not exist' });
    }
}
