interface User {
    _id: string;
    username: string;
    profile_image: Asset;
    password?: string;
}

interface CreateUser {
    username: string;
    email: string;
    password: string;
}

interface UserCredentials {
    username: string;
    password: string;
}