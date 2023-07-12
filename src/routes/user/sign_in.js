const { verifyToken } = require("../../utils/encryption");

module.exports = async ( req, res, next) => {
    let access_token = req.headers.authorization || req.cookies.access_token;
    
    if(!access_token){
      next();
      return;
    }

    try {
      let is_valid = await verifyToken(access_token);
      req.user = is_valid.payload;
      res.redirect("/profile");
    }catch(err){
      next();
    }
};