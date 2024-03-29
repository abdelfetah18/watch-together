import client from "@/database/client";

export default async function handler(req, res) {
    // TODO: Check if user already in the room.
    if(req.method == "POST"){
        let userSession: UserSession = req.userSession;
        let { room_id } = req.body;
        let room = await client.getRoom(room_id);
        if(room){
            let member = { _type:"member", user:{ _type:"reference",_ref: userSession.user_id }, room:{ _type:"reference",_ref: room_id },permissions:["control_video_player","remove_members","edit_room_info"]};
            let createMember = await client.createMember(member);
            res.status(200).json({
                status: "success",
                message: "new members!",
                data: createMember
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
  