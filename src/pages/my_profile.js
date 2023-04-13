import { FaCog, FaEllipsisH, FaPlus } from "react-icons/fa";
import { useState } from "react";
import client from "@/database/client.mjs";
import UserInfo from "@/components/my_profile/UserInfo";
import Room from "@/components/my_profile/Room";
import MyRooms from "@/components/my_profile/MyRooms";
import RoomsYouMayLike from "@/components/my_profile/RoomsYouMayLike";

export async function getServerSideProps({ req, query }){
    // FIXME: make it more simple like req.user is enogh.
    let user_id = req.user.data.user_id;
    let user = await client.getUser(user_id);
    let rooms = await client.getAlreadyInRooms(user_id);
    let rooms_you_may_join = await client.getRoomYouMayJoin(user_id);

    if(user){
        return {
            props:{ user, rooms, rooms_you_may_join }
        };
    }else{
        return {
            redirect: {
                destination: '/user/sign_out',
                permanent: false
            }
        }
    }
}

export default function MyProfile({ user, rooms, rooms_you_may_join }){

    return(
        <div className="h-screen w-full bg-gray-900 flex flex-col items-center overflow-auto">
            <UserInfo user={user} />
            
            <a href="/user/sign_out"  className="font-semibold py-1 text-lg text-white curs">Logout</a>
            
            <div className="w-11/12 flex flex-row my-10 py-4 bg-slate-100 flex-grow rounded">
                <MyRooms rooms={rooms} user={user} />
                <RoomsYouMayLike rooms_you_may_join={rooms_you_may_join} user={user} />
            </div>
        </div>
    )
}
