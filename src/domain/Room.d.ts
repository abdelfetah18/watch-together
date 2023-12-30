interface RoomCategory {
    _id?: string;
    name: string;
};

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
};

interface RoomMember {
    _id?: string;
    user: User | RefDocument;
    room: Room | RefDocument;
    permissions: string[];
};