interface RoomCategory {
    _id?: string;
    name: string;
}

type RoomPrivacy = 'public' | 'private';

interface Room {
    _id?: string;
    name: string;
    bio: string;
    total_members: number;
    profile_image: Asset;
    privacy: RoomPrivacy;
    password?: string;
    admin?: User | RefDocument;
    creator?: User | RefDocument;
    categories: RoomCategory[];
}

interface CreateRoom {
    name: string;
    bio: string;
    password?: string;
    privacy: RoomPrivacy;
    admin: RefDocument;
    creator: RefDocument;
    categories: RefDocument[];
}

interface UpdateRoom {
    name?: string;
    bio?: string;
    privacy: RoomPrivacy;
    password?: string;
    categories?: RefDocument[];
}

interface RoomMember {
    _id?: string;
    user: User | RefDocument;
    room: Room | RefDocument;
    permissions: string[];
}

interface CreateRoomMember {
    user: RefDocument;
    room: RefDocument;
    permissions: string[];
}