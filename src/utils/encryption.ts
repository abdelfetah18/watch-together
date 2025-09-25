import JWT from 'jsonwebtoken';

export const ACCESS_TOKEN_EXPIRES_IN = 1000 * 60 * 60 * 24;

function generateToken(payload: any) {
    return JWT.sign(payload, process.env.JWT_KEY, { algorithm: "HS256", expiresIn: ACCESS_TOKEN_EXPIRES_IN });
}

function verifyToken(token: string): any {
    try {
        return JWT.verify(token, process.env.JWT_KEY, { algorithms: ['HS256'] });
    } catch (err) {
        return null;
    }
}

export { generateToken, verifyToken };