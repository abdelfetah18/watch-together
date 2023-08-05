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
        if(err.code == "ERR_JWS_SIGNATURE_VERIFICATION_FAILED"){
            let token = await generateToken(is_valid.payload);
            res.status(200).json({ status: "success", data: { token }});
        }
        res.status(200).json({ status: "error", message: "Something went wrong", err });

    }
}