declare namespace Express {
    export interface Request {
        userSession?: UserSession // I use string for example, you can put other type
    }
 }