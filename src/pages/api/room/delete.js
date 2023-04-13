import client from "@/database/client.mjs";

export default async function handler(req, res) {
    if(req.method == "POST"){
        var user = req.user.data;
        var { room_id } = req.body;
        var room = await client.getRoomIfAdmin(room_id, user.user_id);
        if(room){
            var result = await client.deleteRoom(room_id);
            res.status(200).json({
                status:"success",
                message:"deleted successfuly!",
                data: result
            });
        }else{
            res.status(200).json({
                status:"error",
                message:"you are not allowed!"
            });
        }
    }else{
        res.status(405).json({
            status:"error",
            message:"method not found!"
        });
    }
}
  