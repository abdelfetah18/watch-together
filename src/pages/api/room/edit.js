import client from "@/database/client.mjs";

export default async function handler(req, res) {
    if(req.method == "POST"){
        let user = req.user.data;
        let { room_id, name, desc, profile_image } = req.body;
        let room = await client.getRoomIfAdmin(room_id, user.user_id);
        if(room){
            // FIXME: 'profile_image' field not handled correctly.
            let new_doc = { name,
                // profile_image: { _type: 'image', asset: { _type: "reference", _ref: profile_image._id }}
            };
            let result = await client.updateRoom(room._id, new_doc);
            res.status(200).json({
                status:"success",
                message:"room data edited successfully!",
                data: result
            });
        }else{
            res.status(200).json({
                status:"error",
                message:"you are not the admin!"
            });
        }
    }else{
        res.status(405).json({
            status:"error",
            message:"method not found!"
        });
    }
}
  