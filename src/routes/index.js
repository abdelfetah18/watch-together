const express = require("express");
const router = express.Router();

const user = require("./user/index");
const api = require("./api/index");
const setup = require("./setup");
const room = require("./room");
const { verifyToken } = require("../utils/encryption");

router.use("/user", user);
router.use("/api", api);
router.use("/setup", setup);
router.use("/room", room);
server.use('/', handle_route);


const handle_route = async ( req, res, next) => {
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

module.exports = router;