import { basename } from 'path';
import { createReadStream } from 'fs';

import Repository from "./Repository";
import UserRepository from "./UserRepository";
import VideoPlayerRepository from './VideoPlayerRepository';

export default class RoomRepository extends Repository {
    static DEFAULT_PROPS = `{
        _id,
        "profile_image": profile_image.asset->,
        categories[]->,
        admin->${UserRepository.DEFAULT_PROPS},
        creator->${UserRepository.DEFAULT_PROPS},
        video_player->${VideoPlayerRepository.DEFAULT_PROPS},
        name,
        privacy,
        password,
        description,
        bio,
        "total_members": count(*[_type=="member" && @.room._ref==^._id])
    }`;

    async createRoom(createRoom: CreateRoom): Promise<Room> {
        const room = await this.sanityClient.create({ _type: "room", ...createRoom });
        return await this.getRoomByName(room.name);
    }

    async updateRoomById(id: string, updateRoom: UpdateRoomForm): Promise<Room> {
        return await this.sanityClient.patch(id).set(updateRoom).commit();
    }

    async deleteRoomById(id: string): Promise<Room> {
        return await this.sanityClient.delete<Room>(id);
    }

    async getRoomsUserIsMemberOf(userId: string): Promise<Room[]> {
        return await this.sanityClient.
            fetch<Room[]>(`*[
                _type == "room" &&
                (_id in *[_type == "member" && $userId == user._ref].room._ref)
            ]${RoomRepository.DEFAULT_PROPS}`, { userId });
    }

    async getPublicRoomsUserIsNotMemberOf(userId: string): Promise<Room[]> {
        return await this.sanityClient.
            fetch<Room[]>(`*[
                    _type=="room" &&
                    !(_id in *[_type=="member" && $userId == @.user._ref].room._ref) &&
                    privacy=="public"
                ]${RoomRepository.DEFAULT_PROPS}`, { userId });
    }

    async getRoomById(id: string): Promise<Room> {
        const rooms = await this.sanityClient.fetch<Room[]>(`*[
            _type=="room" &&
            _id == $id
        ]${RoomRepository.DEFAULT_PROPS}`, { id });

        if (rooms.length > 0) {
            return rooms[0];
        }

        return null;
    }

    async getRoomByName(name: string): Promise<Room> {
        const rooms = await this.sanityClient.fetch<Room[]>(`*[
            _type=="room" &&
            name == $name
        ]${RoomRepository.DEFAULT_PROPS}`, { name });

        if (rooms.length > 0) {
            return rooms[0];
        }

        return null;
    }

    async getRoomWhereUserIsAdmin(room_id: string, user_id: string): Promise<Room> {
        let room = await this.sanityClient.fetch('*[_type=="room" && _id==$room_id && admin->_id==$user_id ]' + RoomRepository.DEFAULT_PROPS, { room_id, user_id });
        if (room.length > 0)
            return room[0];
        return null;
    }

    async searchPublicRoomsByNameMatch(query: string): Promise<Room[]> {
        return await this.sanityClient.fetch<Room[]>(`*[
            _type=="room" &&
            privacy=="public" &&
            name match $query
        ]${RoomRepository.DEFAULT_PROPS}`, { query: "*" + query + "*" });
    }

    async uploadProfileImage(id: string, filePath: string) {
        const imageAsset = await this.sanityClient.assets.
            upload(
                'image',
                createReadStream(filePath),
                { filename: basename(filePath) }
            );

        const room = await this.sanityClient.patch(id).set({
            profile_image: {
                _type: 'image',
                asset: {
                    _type: "reference",
                    _ref: imageAsset._id
                }
            }
        }).commit();

        return { ...room, profile_image: imageAsset };
    }
}