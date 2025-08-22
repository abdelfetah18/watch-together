import { sanityClient } from "../database/client";

import MessagesRepository from "./MessagesRepository";
import RoomCategoryRepository from "./RoomCategoryRepository";
import RoomMemberRepository from "./RoomMemberRepository";
import RoomRepository from "./RoomRepository";
import UserRepository from "./UserRepository";
import VideoPlayerRepository from "./VideoPlayerRepository";

export const userRepository = new UserRepository(sanityClient);
export const roomRepository = new RoomRepository(sanityClient);
export const roomMemberRepository = new RoomMemberRepository(sanityClient);
export const messagesRepository = new MessagesRepository(sanityClient);
export const roomCategoryRepository = new RoomCategoryRepository(sanityClient);
export const videoPlayerRepository = new VideoPlayerRepository(sanityClient);