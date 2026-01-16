import { verifyToken } from '../../utils/encryption';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
  let access_token = req.headers.authorization || req.cookies.access_token;

  if (!access_token) {
    next();
    return;
  }

  try {
    let is_valid: JWTToken<AuthToken> = verifyToken(access_token);
    req.userSession = { access_token, ...is_valid.data };
    res.redirect("/explore");
  } catch (err) {
    next();
  }
};