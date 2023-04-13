import client from "@/database/client.mjs";
import crypto from "crypto";
import { generateToken } from "@/utils/encryption.js";

export default async function handler(req, res) {
    if(req.method == "POST"){
        var { username, password } = req.body;
        var user = await client.getUserWithPassword(username);
        if(user){
            var [hashed_password, salt] = user.password.split(".");
            var hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
            if(hash == hashed_password){
                const token_data = { type:"session", data:{ user_id: user._id } };
                let access_token = await generateToken(token_data);
                res.status(200).json({ status:"success", message:"sign_in success.", data:{ token:access_token } });
            }else{
                res.status(200).json({ status:"error",message:"wrong password." });
            }
        }else{
            res.status(200).json({ status:"error",message:"user not found." });
        }
    }else{
        res.status(405).json({
            status:"error",
            message:"method not found!"
        });
    }
}