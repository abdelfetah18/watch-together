import crypto from "crypto";

import { generateToken } from "@/utils/encryption";
import { userRepository } from "@/repositories";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method != "POST") {
        res.status(405).json({
            status: "error",
            message: "method not found!"
        });
    }

    const { username, password } = req.body;
    const user = await userRepository.getUserWithPasswordByUsername(username);
    if (!user) {
        res.status(404).json({ status: "error", message: "user not found." });
        return;
    }

    const [hashedPassword, salt] = user.password.split(".");
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    if (hash != hashedPassword) {
        res.status(400).json({ status: "error", message: "wrong password." });
        return;
    }

    const tokenData: JWTToken<AuthToken> = { type: "session", data: { user_id: user._id, username: user.username } };
    const accessToken: string = generateToken(tokenData);

    res.
        status(200).
        json({
            status: "success",
            message: "sign in successfully",
            data: { access_token: accessToken, user_id: user._id, username, user } as UserSession,
        });
}