import client from "@/database/client";

export default async function handler(req, res) {
    if(req.method == "POST"){
        let userSession: UserSession = req.userSession;
        let { room_id } = req.body;
        let room = await client.getRoomIfIn(room_id, userSession.user_id);
        if(room){
            let result = await client.removeMemberFromRoom(room_id, room.member_id);
            res.status(200).json({
                status: "success",
                message: "leaved successfuly!",
                data: result
            });
        }else{
            res.status(200).json({
                status:"error",
                message:"you are not a member!"
            });
        }
    }else{
        res.status(405).json({
            status:"error",
            message:"method not found!"
        });
    }
}
  