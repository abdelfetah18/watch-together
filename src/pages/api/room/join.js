import client from "@/database/client.mjs";

export default async function handler(req, res) {
    if(req.method == "POST"){
        let user = req.user.data;
        let { room_id } = req.body;
        let room = await client.getRoom(room_id);
        if(room){
            let member = { _type:"member",user:{ _type:"reference",_ref: user.user_id },permissions:["control_video_player","remove_members","edit_room_info"]};
            let createMember = await client.createMember(member);
            let addMember = await client.addMemberToRoom(room_id, createMember._id);
            res.status(200).json({
                status: "success",
                message: "new members!",
                data: addMember
            });
        }else{
            res.status(200).json({
                status:"error",
                message:"room not exists!"
            });
        }
    }else{
        res.status(405).json({
            status:"error",
            message:"method not found!"
        });
    }
}
  