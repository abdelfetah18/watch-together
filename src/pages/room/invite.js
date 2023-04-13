import { useEffect } from "react";
import { verifyToken } from "@/utils/encryption.js";
import client from "@/database/client.mjs";

export async function getServerSideProps(ctx){
    const token = ctx.query.token;
    let is_valid = await verifyToken(token);
    if(is_valid && is_valid.payload.type === "invite"){
        let room_id = is_valid.payload.data.room_id;
        let user = ctx.req.user.data;
        let room = await client.getAlreadyInRooms(user.user_id);
        if(!room){
            let member = { _type:"member",user:{ _type:"reference",_ref: user.user_id },permissions:["control_video_player","remove_members","edit_room_info"]};
            let new_member = await client.createMember(member);
            let joined_member = await client.addMemberToRoom(room_id,new_member._id);
 
            return {
                redirect: {
                    destination: '/room/'+room_id,
                    permanent: false
                }
            }
        }else{
            return {
                props:{ status: "error", message: "room not found or you already in." }
            }
        }
    }else{
        return {
            redirect: {
                destination: '/my_profile',
                permanent: false
            }
        }
    }
    
}
    

  export default function Invite({ status, message }){
    
    useEffect(() => {
        setTimeout(() => window.location.href = "/my_profile",3000);
    },[]);

    return(
        <div className="w-screen h-screen flex flex-row items-center justify-center">
            <div className="font-mono text-lg font-bold text-red-500 px-4">{status}:</div>
            <div className="font-mono text-lg font-semibold">{message}</div>
        </div>
    )
}