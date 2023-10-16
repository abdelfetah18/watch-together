const { generateToken } = require("../../../utils/encryption");
const { verifyToken } = require("../../../utils/encryption");

module.exports = async ( req, res) => {
    let access_token = req.headers.authorization || req.cookies.access_token;
    if(!access_token){
        res.status(200).json({ status: "error", message: "Access token not provided." });
        return;
    }
    
    try {
        let is_valid = await verifyToken(access_token);
        if(is_valid){
            res.status(200).json({ status: "success", data: { token: access_token }});
        }
    }catch(err){
        // FIXME: Find a better way to extract the payload for the new token
        //        Like passing user_id in the request body.
        let payload = JSON.parse(Buffer.from(access_token.split(".")[1], 'base64').toString());
        console.log({ payload });
        if(err.code == "ERR_JWT_EXPIRED"){
            let token = await generateToken(payload);
            res.status(200).json({ status: "success", data: { token }});
        }
        res.status(200).json({ status: "error", message: "Something went wrong", err });

    }
}