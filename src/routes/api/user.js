const { verifyToken } = require("../../utils/encryption");

module.exports = async ( req, res, nextR) => {
    let access_token = req.headers.authorization || req.cookies.access_token;
    if(!access_token){
      res.redirect("/user/sign_in");
      return;
    }
    
    try {
      let is_valid = await verifyToken(access_token);
      req.user = is_valid.payload;
      nextR();
    }catch(err){
      res.redirect("/user/sign_in");
    }
}