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
    categories: (RoomCategory | RefDocument)[];
    video_player?: VideoPlayer;
}

interface CreateRoom {
    name: string;
    bio: string;
    password?: string;
    privacy: RoomPrivacy;
    admin: RefDocument;
    creator: RefDocument;
    categories: RefDocument[];
    video_player: RefDocument;
}

interface CreateRoomForm {
    name: string;
    bio: string;
    password?: string;
    privacy: RoomPrivacy;
    categories: RefDocument[];
}

interface UpdateRoomForm {
    name?: string;
    bio?: string;
    privacy?: RoomPrivacy;
    password?: string;
    categories?: RefDocument[];
    video_player?: RefDocument;
    profile_image?: {
        _type: "image";
        asset: RefDocument;
    };
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

interface YoutubeVideo {
    type: string;
    videoId: string;
    url: string;
    title: string;
    description: string;
    image: string;
    thumbnail: string;
    seconds: number;
    timestamp: string;
    duration: {
        seconds: number;
        timestamp: string;
    };
    ago: string;
    views: number;
    author: {
        name: string;
        url: string;
    };
}