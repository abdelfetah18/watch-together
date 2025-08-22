import { basename } from 'path';
import { createReadStream } from 'fs';

import Repository from "./Repository";

export default class UserRepository extends Repository {
    static DEFAULT_PROPS = `{ 
        _id,
        username,
        "profile_image": profile_image.asset->
    }`;

    static PASSWORD_PROPS = `{ 
        _id,
        username,
        password,
        "profile_image": profile_image.asset->
    }`;

    async createUser(createUser: CreateUser): Promise<User> {
        const user = await this.sanityClient.create({ _type: "user", ...createUser });
        return await this.getUserById(user._id);
    }

    async getUserByUsername(username: string): Promise<User> {
        const users = await this.sanityClient.fetch<User[]>(`*[
            _type=="user" &&
            username == $username
        ]${UserRepository.DEFAULT_PROPS}`, { username });

        if (users.length > 0) {
            return users[0];
        }

        return null;
    }

    async getUserById(id: string): Promise<User> {
        const users = await this.sanityClient.fetch<User[]>(`*[
            _type=="user" &&
            _id == $id
        ]${UserRepository.DEFAULT_PROPS}`, { id });

        if (users.length > 0) {
            return users[0];
        }

        return null;
    }

    async getUserWithPasswordByUsername(username: string): Promise<User> {
        const users = await this.sanityClient.fetch<User[]>(`*[
            _type=="user" &&
            username == $username
        ]${UserRepository.PASSWORD_PROPS}`, { username });

        if (users.length > 0) {
            return users[0];
        }

        return null;
    }

    async uploadProfileImage(id: string, filePath: string) {
        const imageAsset = await this.sanityClient.assets.
            upload(
                'image',
                createReadStream(filePath),
                { filename: basename(filePath) }
            );

        const user = await this.sanityClient.patch(id).set({
            profile_image: {
                _type: 'image',
                asset: {
                    _type: "reference",
                    _ref: imageAsset._id
                }
            }
        }).commit();

        return { ...user, profile_image: imageAsset };
    }
};