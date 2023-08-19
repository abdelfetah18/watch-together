import client from "@/database/client.mjs";
import crypto from "crypto";
import { generateToken } from "@/utils/encryption.js";

export default async function handler(req, res) {
    if(req.method == "POST"){
        try {
            let { username, email, password } = req.body;
            let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if(!email.match(validRegex)){
                res.status(200).json({ status:"error", message: "email not valid!" });
            }else{
                let user = await client.getUser(username);
                if(user){
                    res.status(200).json({ status:"error", message: "username already in use!" });
                }else{
                    let salt = crypto.randomBytes(16).toString('hex');
                    let hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
                    hash += "." + salt;
                    let new_user = await client.createUser({ _type:"user", username, email, password: hash });
                    const token_data = { type:"setup", data:{ user_id: new_user._id } };
                    let access_token = await generateToken(token_data);
                    res.status(200).json({ status:"success", message:"sign_up successfuly!", data:{ token: access_token } });
                }
            }
        } catch(err){
            res.status(200).json({ status:"error", message: err.CODE, error: err });
        }
    }else{
        res.status(405).json({
            status:"error",
            message:"method not found!"
        });
    }
}