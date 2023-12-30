import { basename } from 'path';
import { createReadStream } from 'fs';
import { SanityClient, createClient } from '@sanity/client';

const client: SanityClient = createClient({
  projectId: 'g8kwgm04',
  dataset: 'production',
  apiVersion: '2022-10-05',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const USER_PROPS = '{ _id,username,"profile_image":profile_image.asset-> }';
const USER_PASSWORD_PROPS = '{ _id, username, password, "profile_image": profile_image.asset->url }';
const ROOM_PROPS = '{ _id,"profile_image": profile_image.asset->,categories[]->,admin->, creator->, name, privacy, password, description, bio, "total_members": count(*[_type=="member" && @.room._ref==^._id]) }';
const MESSAGE_PROPS = '{"user":user->{ _id,username,"profile_image":@.profile_image.asset->url },message,type,_createdAt } | order(@._createdAt asc)';
const MEMBER_PROPS = `{_id, user->${USER_PROPS}, room->${ROOM_PROPS}, permissions }`;
const ROOM_CATEGORY_PROPS = '{ _id, name }';

class Client {
  sanity_client: SanityClient;
  constructor(sanity_client: SanityClient) {
    this.sanity_client = sanity_client;
  }

  async getUser(user_id: string) {
    let users = await this.sanity_client.fetch('*[_type=="user" && (_id == $user_id || username == $user_id)]' + USER_PROPS, { user_id });
    if (users.length > 0)
      return users[0];
    return null;
  }

  async getUserWithPassword(user_id: string) {
    let users = await this.sanity_client.fetch('*[_type=="user" && (_id == $user_id || username == $user_id)]' + USER_PASSWORD_PROPS, { user_id });
    if (users.length > 0)
      return users[0];
    return null;
  }

  async createUser(user_doc) {
    let user = await this.sanity_client.create(user_doc);
    return user;
  }

  async getAlreadyInRooms(user_id: string) {
    let rooms = await this.sanity_client.fetch('*[_type=="room" && _id in *[_type=="member" && $user_id==user._ref].room._ref]' + ROOM_PROPS, { user_id });
    return rooms;
  }

  async getRoomYouMayJoin(user_id: string) {
    let rooms_you_may_join = await this.sanity_client.fetch('*[_type=="room" && !(_id in *[_type=="member" && $user_id == @.user._ref].room._ref) && privacy=="public"]' + ROOM_PROPS, { user_id });
    return rooms_you_may_join;
  }

  async createMember(member_doc) {
    let member = await this.sanity_client.create(member_doc);
    return member;
  }

  async doMemberHasAccess(room_id: string, user_id: string, perm: string) {
    let access = await this.sanity_client.fetch('*[_type=="member" && room._ref==$room_id && user._ref==$user_id && $perm in permissions].user->', { room_id, user_id, perm });
    return access;
  }

  async removeMemberFromRoom(room_id: string, member_id: string) {
    let member = await this.sanity_client.fetch('*[_type=="member" && room._ref==$room_id && user._ref==$user_id]' + MEMBER_PROPS, { room_id, user_id: member_id });
    let deleted = null;
    if (member)
      deleted = await this.sanity_client.delete(member._id);
    return deleted;
  }

  async getRoom(room_id: string) {
    let room = await this.sanity_client.fetch('*[_type=="room" && (_id == $room_id || name == $room_id)]', { room_id });
    if (room.length > 0)
      return room[0];
    return null;
  }

  async getRoomIfAdmin(room_id: string, user_id: string) {
    let room = await this.sanity_client.fetch('*[_type=="room" && _id==$room_id && admin->_id==$user_id ]' + ROOM_PROPS, { room_id, user_id });
    if (room.length > 0)
      return room[0];
    return null;
  }

  async getRoomIfIn(room_id: string, user_id: string) {
    let room = await this.sanity_client.fetch('*[_type=="member" && room._ref==$room_id && user._ref==$user_id].room->' + ROOM_PROPS, { room_id, user_id });
    if (room.length > 0)
      return room[0];
    return null;
  }

  async getRoomAdmin(room_id: string) {
    let users = await this.sanity_client.fetch('*[_type=="room" && _id == $room_id].admin->' + USER_PROPS, { room_id });
    if (users.length > 0)
      return users[0];
    return null;
  }

  async createRoom(room_doc) {
    let room = await this.sanity_client.create(room_doc);
    return room;
  }

  async deleteRoom(room_id: string) {
    let deleted = await this.sanity_client.delete(room_id);
    return deleted;
  }

  async updateRoom(room_id: string, room_doc) {
    let room = await this.sanity_client.patch(room_id).set(room_doc).commit();
    return room;
  }

  // NOTE: since i am using 'profile_image' every were there no problem using this hack.
  async uploadProfile(filePath: string, doc_id: string) {
    try {
      var imageAsset = await this.sanity_client.assets.upload('image', createReadStream(filePath), { filename: basename(filePath) });
    } catch (err) {
      console.log('db_error:', err)
    }
    let doc_info = await client.patch(doc_id).set({
      profile_image: {
        _type: 'image',
        asset: {
          _type: "reference",
          _ref: imageAsset._id
        }
      }
    }).commit();
    return { ...doc_info, profile_image: imageAsset };
  }

  async uploadImage(filePath: string) {
    try {
      var imageAsset = await this.sanity_client.assets.upload('image', createReadStream(filePath), { filename: basename(filePath) });
    } catch (err) {
      console.log('db_error:', err);
      return null;
    }

    return { image: imageAsset }
  }

  async getMessages(room_id: string, user_id: string) {
    let messages = await this.sanity_client.fetch('*[_type=="messages" && room._ref == $room_id && ($user_id in *[_type=="member" && room._ref==$room_id].user._ref)]' + MESSAGE_PROPS, { room_id, user_id });
    return messages;
  }

  async createMessage(msg_doc) {
    let message = await this.sanity_client.create(msg_doc);
    return message;
  }

  async getMessageById(message_id: string) {
    let messages = await this.sanity_client.fetch('*[_type=="messages" && _id==$message_id]' + MESSAGE_PROPS, { message_id });
    if (messages.length > 0)
      return messages[0];
    return null;
  }

  async searchForRoom(query: string) {
    let rooms = await this.sanity_client.fetch('*[_type=="room" && privacy=="public" && name match $query]' + ROOM_PROPS, { query: "*" + query + "*" });
    return rooms;
  }

  async getRoomCategories() {
    let room_categories = await this.sanity_client.fetch(`*[_type=="room_category"]${ROOM_CATEGORY_PROPS}`);
    return room_categories;
  }

  async getRoomMembers(room_id: string) {
    let room_members = await this.sanity_client.fetch(`*[_type=="member" && room._ref == $room_id]${MEMBER_PROPS}`, { room_id });
    return room_members;
  }
}

/*
async function clearDatabase(type){
  try {
    var r = await client.delete({ query: '*[_type=="'+type+'"]'});
  } catch(err){
    console.log(type,err);
  }
  return r;
}
*/

let database_client = new Client(client);

export default database_client;