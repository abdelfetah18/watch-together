import Repository from "./Repository";
import UserRepository from "./UserRepository";

export default class MessagesRepository extends Repository {
    DEFAULT_PROPS = `{
        _id,    
        "user": user->${UserRepository.DEFAULT_PROPS},
        message,
        type,
        _createdAt
    } | order(@._createdAt asc)`;

    async listMessagesForRoomMember(roomId: string, userId: string): Promise<Message[]> {
        return await this.sanityClient.fetch(`*[
            _type=="messages" &&
            room._ref == $roomId &&
            (
                $userId in *[
                    _type=="member" &&
                    room._ref==$roomId
                ].user._ref)
        ]${this.DEFAULT_PROPS}`, { roomId, userId });
    }

    async createMessage(createMessage: CreateMessage): Promise<Message> {
        return await this.sanityClient.create({
            _type: "messages",
            ...createMessage
        });
    }

    async getMessageById(id: string): Promise<Message> {
        const messages = await this.sanityClient.fetch(`*[
            _type == "messages" &&
            _id == $id
        ]${this.DEFAULT_PROPS}`, { id });

        if (messages.length > 0) {
            return messages[0];
        }

        return null;
    }
}