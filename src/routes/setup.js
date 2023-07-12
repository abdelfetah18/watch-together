const { verifyToken } = require("../utils/encryption");

module.exports = async ( req, res, next) => {
    let access_token = req.cookies.access_token;
    if(!access_token){
        res.redirect("/user/sign_in");
        next();
        return;
    }
    try {
        let is_valid = await verifyToken(access_token);
        req.user = is_valid.payload;
        if(is_valid.payload.type === "setup")
            next();
        else
          res.redirect("/profile");
    }catch(err){
       res.redirect("/user/sign_in");
    }
}