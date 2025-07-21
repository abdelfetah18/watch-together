import Repository from "./Repository";
import RoomRepository from "./RoomRepository";
import UserRepository from "./UserRepository";

export default class RoomMemberRepository extends Repository {
    DEFAULT_PROPS = `{
        _id,
        user->${UserRepository.DEFAULT_PROPS},
        room->${RoomRepository.DEFAULT_PROPS},
        permissions
    }`;

    async createMember(createRoomMember: CreateRoomMember): Promise<RoomMember> {
        return await this.sanityClient.create<RoomMember>({
            _type: "member",
            ...createRoomMember
        });
    }

    async deleteRoomMemberById(roomId: string, memberId: string) {
        const member = await this.sanityClient.fetch(`*[
            _type == "member" &&
            room._ref == $roomId &&
            user._ref == $memberId
        ]${this.DEFAULT_PROPS}`, { roomId, memberId });

        let deleted = null;
        if (member)
            deleted = await this.sanityClient.delete(member._id);

        return deleted;
    }

    async getRoomMembersByRoomId(roomId: string): Promise<Room[]> {
        return await this.sanityClient.fetch(`*[
            _type=="member" &&
            room._ref == $roomId
        ]${this.DEFAULT_PROPS}`, { roomId });
    }
}