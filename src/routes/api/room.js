const { verifyToken } = require("../../utils/encryption");

module.exports = async ( req, res, next) => {
    let access_token = req.headers.authorization || req.cookies.access_token;
    if(!access_token){
        res.redirect("/user/sign_in");
        next();
    }
 
    try {
        let is_valid = await verifyToken(access_token);
        req.user = is_valid.payload;
        if(is_valid){
            next();
        }
    }catch(err){
        console.log(err);
        res.status(200).json({ status: "error", message: "Something went wrong.", error: err });
    }
}