import crypto from "crypto";

import { ACCESS_TOKEN_EXPIRES_IN, generateToken } from "@/utils/encryption";
import { userRepository } from "@/repositories";
import { NextApiRequest, NextApiResponse } from "next";
import moment from "moment";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method != "POST") {
        res.status(405).json({
            status: "error",
            message: "method not found!"
        });
        return;
    }

    try {
        const { username, email, password } = req.body;
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!email.match(emailRegex)) {
            res.status(400).json({ status: "error", message: "email not valid!" });
            return;
        }

        const user = await userRepository.getUserByUsername(username);
        if (user) {
            res.status(400).json({ status: "error", message: "username already in use!" });
            return;
        }

        const salt = crypto.randomBytes(16).toString('hex');
        let hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
        hash += "." + salt;
        const newUser = await userRepository.createUser({ username, email, password: hash });
        const token_data: JWTToken<AuthToken> = { type: "session", data: { user_id: newUser._id, username: newUser.username } };
        const access_token: string = generateToken(token_data);
        const expires = moment().add(ACCESS_TOKEN_EXPIRES_IN, "second").toDate();
        res.setHeader("Set-Cookie", `access_token=${access_token}; Path=/; HttpOnly; Expires=${expires}`);
        res.status(200).json({
            status: "success",
            message: "sign_up successfuly!",
            data: {
                access_token,
                user_id: newUser._id,
                username: newUser.username,
                user: newUser,
            } as UserSession
        });

    } catch (err) {
        res.status(400).json({ status: "error", message: err.CODE, error: err });
    }
}