import Repository from "./Repository";
import RoomRepository from "./RoomRepository";
import UserRepository from "./UserRepository";

export default class RoomMemberRepository extends Repository {
    static DEFAULT_PROPS = `{
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
        ]${RoomMemberRepository.DEFAULT_PROPS}`, { roomId, memberId });

        let deleted = null;
        if (member)
            deleted = await this.sanityClient.delete(member._id);

        return deleted;
    }

    async getRoomMembersByRoomId(roomId: string): Promise<Room[]> {
        return await this.sanityClient.fetch(`*[
            _type=="member" &&
            room._ref == $roomId
        ]${RoomMemberRepository.DEFAULT_PROPS}`, { roomId });
    }

    async getRoomMembersByUserId(roomId: string, userId: string): Promise<Room[]> {
        return await this.sanityClient.fetch(`*[
            _type=="member" &&
            room._ref == $roomId &&
            user._ref == $userId
        ]${RoomMemberRepository.DEFAULT_PROPS}`, { roomId, userId });
    }

    async deleteRoomMembers(roomId: string): Promise<void> {
        await this.sanityClient.delete({ query: '*[_type=="member" && room._ref==$roomId]', params: { roomId } });
    }
}