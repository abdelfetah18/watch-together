import { userRepository } from "@/repositories";

export default async function handler(req, res) {
    if (req.method == "GET") {
        const userSession: UserSession = req.userSession;

        const user = await userRepository.getUserById(userSession.user_id);
        if (user) {
            res.status(200).json({ status: "success", data: user });
        } else {
            res.status(404).json({ status: "error", message: 'user not exist' });
        }
        return;
    }

    if (req.method == "POST") {
        const userSession: UserSession = req.userSession;

        const user = userRepository.updateUser(userSession.user_id, req.body);
        if (user) {
            res.status(200).json({ status: "success", data: user });
        } else {
            res.status(404).json({ status: "error", message: 'user not exist' });
        }
        return;
    }

    res.status(405).json({
        status: "error",
        message: "method not found!"
    });
}
