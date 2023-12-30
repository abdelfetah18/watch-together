import { verifyToken, generateToken } from '../../../utils/encryption';

export default async (req, res) => {
    let access_token = req.headers.authorization || req.cookies.access_token;
    if (!access_token) {
        res.status(200).json({ status: "error", message: "Access token not provided." });
        return;
    }

    try {
        let is_valid: JWTToken<AuthToken> = verifyToken(access_token);
        if (is_valid) {
            res.status(200).json({ status: "success", data: { token: access_token } });
        }
    } catch (err) {
        // FIXME: Find a better way to extract the payload for the new token
        //        Like passing user_id in the request body.
        let payload: JWTToken<AuthToken> = JSON.parse(Buffer.from(access_token.split(".")[1], 'base64').toString());
        if (err.code == "ERR_JWT_EXPIRED") {
            let token: string = generateToken(payload);
            res.status(200).json({ status: "success", data: { token } });
        }
        res.status(200).json({ status: "error", message: "Something went wrong", err });

    }
}