import { verifyToken } from '../utils/encryption';
import { NextFunction, Request, Response } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    let protected_paths = ['/explore', '/settings', '/search', '/room/create', '/api/explore', '/api/search'];
    if (!protected_paths.includes(req.path)) {
        next();
        return;
    }

    let access_token = req.headers.authorization || req.cookies.access_token;
    if (!access_token) {
        res.redirect("/user/sign_in");
        return;
    }

    try {
        let is_valid: JWTToken<AuthToken> = verifyToken(access_token);
        req.userSession = { access_token, ...is_valid.data };
        next();
    } catch (err) {
        res.redirect("/user/sign_in");
    }
}