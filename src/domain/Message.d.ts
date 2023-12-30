type MessageType = 'text' | 'image';

interface Message {
    _id?: string;
    room: Room | RefDocument;
    user: User | RefDocument;
    message: string;
    image?: Asset;
    type: MessageType;
    _createdAt: string;
};