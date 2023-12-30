interface UserSession {
    user_id: string;
    access_token: string;
    username: string;
    user?: User;
};

type JWTTokenType = "session" | "room_invite";
interface JWTToken<T> {
    type: JWTTokenType;
    data: T;
}

interface AuthToken {
    user_id: string;
    username: string;
};

interface RoomInviteToken {
    room_id: string;
    inviter_id: string;
};