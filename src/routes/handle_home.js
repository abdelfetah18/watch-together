const { verifyToken } = require("../utils/encryption");

module.exports = async ( req, res, next) => {
    let protected_paths = ['/my_profile','/profile','/explore','/settings','/room/create','/api/explore'];
    if(!protected_paths.includes(req.path)){
        next();
        return;
    }

    let access_token = req.headers.authorization || req.cookies.access_token;
    if(!access_token){
        res.redirect("/user/sign_in");
        return;
    }

    try {
        let is_valid = await verifyToken(access_token);
        req.user = is_valid.payload;
        next();
    }catch(err){
        res.redirect("/user/sign_in");
    }
}