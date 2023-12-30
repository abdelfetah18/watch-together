import client from "@/database/client";
import crypto from "crypto";
import { generateToken } from "@/utils/encryption";

export default async function handler(req, res) {
    if (req.method == "POST") {
        let { username, password } = req.body;
        let user: User = await client.getUserWithPassword(username);
        if (user) {
            let [hashed_password, salt] = user.password.split(".");
            let hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
            if (hash == hashed_password) {
                const token_data: JWTToken<AuthToken> = { type: "session", data: { user_id: user._id, username: user.username } };
                let access_token: string = generateToken(token_data);
                res.status(200).json({ status: "success", message: "sign_in success.", data: { token: access_token } });
            } else {
                res.status(200).json({ status: "error", message: "wrong password." });
            }
        } else {
            res.status(200).json({ status: "error", message: "user not found." });
        }
    } else {
        res.status(405).json({
            status: "error",
            message: "method not found!"
        });
    }
}