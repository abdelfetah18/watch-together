import { basename } from 'path';
import { createReadStream } from 'fs';
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'g8kwgm04',
  dataset: 'production',
  apiVersion: '2022-10-05',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const user_props = '{ _id,username,"profile_image":profile_image.asset->url }';
const user_password_props = '{ _id, username, password, "profile_image": profile_image.asset->url }'; 
const room_props = '{ _id,"profile_image": profile_image.asset->url,admin->, creator->, name, description, "total_members": count(*[_type=="member" && @.room._ref==^._id]) }';
const message_props = '{"user":user->{ _id,username,"profile_image":@.profile_image.asset->url },message,type,_createdAt } | order(@._createdAt asc)';
const member_props = '{_id, user->, room->, permissions }'

class Client {
    constructor(sanity_client){
        this.sanity_client = sanity_client;
    }

    async getUser(user_id){
        let users = await this.sanity_client.fetch('*[_type=="user" && (_id == $user_id || username == $user_id)]'+user_props,{ user_id });
        if(users.length > 0)
            return users[0];
        return null;
    }

    async getUserWithPassword(user_id){
        let users = await this.sanity_client.fetch('*[_type=="user" && (_id == $user_id || username == $user_id)]'+user_password_props,{ user_id });
        if(users.length > 0)
            return users[0];
        return null;
    }

    async createUser(user_doc){
      let user = await this.sanity_client.create(user_doc);
      return user;
    }

    async getAlreadyInRooms(user_id){
        let rooms = await this.sanity_client.fetch('*[_type=="room" && _id in *[_type=="member" && $user_id==user._ref].room._ref]'+room_props,{ user_id });
        return rooms;
    }

    async getRoomYouMayJoin(user_id){
        let rooms_you_may_join = await this.sanity_client.fetch('*[_type=="room" && !(_id in *[_type=="member" && $user_id == @.user._ref].room._ref) && privacy=="public"]'+room_props,{ user_id });
        return rooms_you_may_join;
    }

    async createMember(member_doc){
      let member = await this.sanity_client.create(member_doc);
      return member;
    }

    async doMemberHasAccess(room_id, user_id, perm){
      let access = await this.sanity_client.fetch('*[_type=="member" && room._ref==$room_id && user._ref==$user_id && $perm in permissions].user->',{ room_id, user_id, perm });
      return access;
    }

    async removeMemberFromRoom(room_id, member_id){
      let member = await this.sanity_client.fetch('*[_type=="member" && room._ref==$room_id && user._ref==$user_id]'+member_props)
      let deleted = null;
      if(member)
        deleted = await this.sanity_client.delete(member._id);
      return deleted;
    }

    async getRoom(room_id){
      let room = await this.sanity_client.fetch('*[_type=="room" && (_id == $room_id || name == $room_id)]',{ room_id });
      if(room.length > 0)
        return room[0];
      return null;
    }

    async getRoomIfAdmin(room_id, user_id){
      let room = await this.sanity_client.fetch('*[_type=="room" && _id==$room_id && admin->_id==$user_id ]'+room_props,{ room_id, user_id });
      if(room.length > 0)
        return room[0];
      return null;
    }
    
    async getRoomIfIn(room_id, user_id){
      let room = await this.sanity_client.fetch('*[_type=="member" && room._ref==$room_id && user._ref==$user_id].room->'+room_props,{ room_id, user_id });
      if(room.length > 0)
        return room[0];
      return null;
    }

    async getRoomAdmin(room_id){
      let users = await this.sanity_client.fetch('*[_type=="room" && _id == $room_id].admin->'+user_props,{ room_id });
      if(users.length > 0)
          return users[0];
      return null;
    }

    async createRoom(room_doc){
      let room = await this.sanity_client.create(room_doc);
      return room;
    }

    async deleteRoom(room_id){
      let deleted = await this.sanity_client.delete(room_id);
      return deleted;
    }

    async updateRoom(room_id, room_doc){
      let room = await this.sanity_client.patch(room_id).set(room_doc).commit();
      return room;
    }

    // NOTE: since i am using 'profile_image' every were there no problem using this hack.
    async uploadProfile(filePath,doc_id){
      try {
        var imageAsset = await this.sanity_client.assets.upload('image', createReadStream(filePath),{ filename: basename(filePath) });
      } catch(err) {
        console.log('db_error:',err)
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

    async uploadImage(filePath){
      try {
          var imageAsset = await this.sanity_client.assets.upload('image', createReadStream(filePath),{ filename: basename(filePath) });
      } catch(err) {
          console.log('db_error:',err);
          return null;
      }
      
      return { image:imageAsset }
    }

    async getMessages(room_id, user_id){
      let messages = await this.sanity_client.fetch('*[_type=="messages" && room._ref == $room_id && ($user_id in *[_type=="member" && room._ref==$room_id].user._ref)]'+message_props,{ room_id, user_id });
      return messages;
    }

    async createMessage(msg_doc){
      let message = await this.sanity_client.create(msg_doc);
      return message;
    }

    async getMessageById(message_id){
      let messages = await this.sanity_client.fetch('*[_type=="messages" && _id==$message_id]'+message_props,{ message_id });
      if(messages.length > 0)
        return messages[0];
      return null;
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