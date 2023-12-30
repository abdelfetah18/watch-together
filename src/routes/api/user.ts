import { verifyToken } from '../../utils/encryption';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, nextR: NextFunction) => {
  let access_token = req.headers.authorization || req.cookies.access_token;
  if (!access_token) {
    res.redirect("/user/sign_in");
    return;
  }

  try {
    let is_valid: JWTToken<AuthToken> = verifyToken(access_token);
    req.userSession = { access_token, ...is_valid.data };
    nextR();
  } catch (err) {
    res.redirect("/user/sign_in");
  }
}