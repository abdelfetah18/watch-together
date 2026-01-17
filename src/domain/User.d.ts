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

interface UpdateUser {
    username: string;
    profile_image?: {
        _type: "image";
        asset: RefDocument;
    };
}

interface UserCredentials {
    username: string;
    password: string;
}