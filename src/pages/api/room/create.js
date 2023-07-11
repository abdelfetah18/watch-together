import client from "@/database/client.mjs";

export default async function handler(req, res) {
    if(req.method == "POST"){
        let user_info = req.user.data;
        let { name, description, privacy, password } = req.body;
        let room_with_same_name = await client.getRoom(name);
        if(room_with_same_name){
            res.status(200).json({
                status:"error",
                message:"room name already exists!"
            });
        }else{
            let room_doc = { _type:"room", name, creator:{ _type:"reference",_ref:user_info.user_id }, admin:{ _type:"reference",_ref:user_info.user_id },members:[{ _type:"reference",_ref:member._id }], description,privacy,password };
            let room = await client.createRoom(room_doc);
            
            let member_doc = { _type:"member", user:{ _type:"reference", _ref: user_info.user_id },room: { _type:"reference", _ref: room._id },permissions: ["control_video_player","remove_members","edit_room_info"] };
            let member = await client.createMember(member_doc);
            
            res.status(200).json({ status:"success", data: room });
        }
    }else{
        res.status(405).json({
            status:"error",
            message:"method not found!"
        });
    }
}
  