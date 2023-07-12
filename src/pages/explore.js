import client from "@/database/client.mjs";
import Navigation from "@/components/my_profile/Navigation"
import axios from "axios";
import { useEffect, useState } from "react";


export async function getServerSideProps({ req }){
    // FIXME: make it more simple like req.user is enogh.
    let user_id = req.user.data.user_id;
    let user = await client.getUser(user_id);
    let rooms = await client.getRoomYouMayJoin(user_id);

    if(user){
        return {
            props:{ user, rooms }
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

export default function Explore({ user }){
    const [rooms,setRooms] = useState([]);

    function getRooms(){
        axios.get("/api/explore",{
            headers:{
                authorization:user.access_token
            }
        }).then((res) => {
            if(res.data.status == "success"){
                setRooms(res.data.data);
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        getRooms();
    },[]);

    return(
        <div className="w-full h-screen bg-gray-900 flex flex-row font-mono">
            <Navigation user={user} selected_label={"EXPLORE"} />
            <div className="w-5/6 h-full flex flex-col items-center py-4">
                <div className="w-11/12 flex-grow overflow-auto flex flex-col">
                    <div className="w-full text-lg font-semibold text-white">EXPLORE</div>
                    <div className="w-full flex flex-row flex-wrap my-4">
                        {
                            rooms.map((room, index) => {

                                function joinRoom(ev){
                                    axios.post("/api/room/join",{ room_id:room._id },{
                                        headers:{
                                            authorization:user.access_token
                                        }
                                    }).then((res) => {
                                        if(res.data.status == "success"){
                                            getRooms();
                                        }
                                    }).catch((err) => {
                                        console.log(err);
                                    });
                                }

                                return(
                                    <div key={index} className="w-1/4 flex flex-col mb-4">
                                        <div className="w-11/12 h-full bg-gray-700 flex flex-col items-center rounded-lg">
                                            <img className="w-full object-contain rounded-t-lg" src={room.profile_image ?? "/thumb.png"} />
                                            <div className="w-11/12 flex-grow flex flex-col">
                                                <div className="text-base text-gray-100 font-medium py-2">{room.name}</div>
                                                <div className="text-sm text-gray-400">{room.description}</div>
                                                <div className="text-sm text-green-400 mt-2">{room.total_members} Members</div>
                                            </div>
                                            <button type="button" onClick={joinRoom} href={"/room/"+room._id} className="w-full text-white font-semibold py-2 bg-sky-800 hover:bg-sky-900 text-center cursor-pointer mt-4 rounded-b-lg">JOIN</button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}