import { verifyToken } from '../../utils/encryption';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    let access_token = req.headers.authorization || req.cookies.access_token;
    if(!access_token){
        res.redirect("/user/sign_in");
        next();
    }
 
    try {
        let is_valid: JWTToken<AuthToken> = verifyToken(access_token);
        req.userSession = { access_token, ...is_valid.data };
        if(is_valid){
            next();
        }
    }catch(err){
        console.log(err);
        res.status(200).json({ status: "error", message: "Something went wrong.", error: err });
    }
}