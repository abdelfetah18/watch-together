import { useEffect } from "react";
import { verifyToken } from "@/utils/encryption.js";
import client from "@/database/client.mjs";

export async function getServerSideProps({ req, query  }){
    const token = query.token;
    let is_valid = await verifyToken(token);
    if(is_valid && is_valid.payload.type === "invite"){
        let room_id = is_valid.payload.data.room_id;
        let user = req.user.data;
        let room = await client.getRoomIfIn(room_id, user.user_id);
        console.log({ room })
        if(!room){
            let member_doc = { _type:"member",user:{ _type:"reference",_ref: user.user_id },room: { _type: "reference", _ref: room_id },permissions:["control_video_player","remove_members","edit_room_info"]};
            await client.createMember(member_doc);
 
            return {
                redirect: {
                    destination: '/room/'+room_id,
                    permanent: false
                }
            }
        }else{
            return {
                props:{ status: "error", message: "Room not found or you already in." }
            }
        }
    }else{
        return {
            redirect: {
                destination: '/profile',
                permanent: false
            }
        }
    }
    
}
    

  export default function Invite({ status, message }){
    
    useEffect(() => {
        setTimeout(() => window.location.href = "/profile",3000);
    },[]);

    return(
        <div className="w-screen h-screen flex flex-row items-center justify-center">
            <div className="font-mono text-lg font-bold text-red-500 px-4">{status}:</div>
            <div className="font-mono text-lg font-semibold">{message}</div>
        </div>
    )
}