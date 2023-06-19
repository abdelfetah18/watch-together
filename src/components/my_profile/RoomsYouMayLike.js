import axios from "axios";

export default function RoomsYouMayLike({ user, rooms_you_may_join }){
    return(
        <div className="w-2/3 flex flex-col items-center">
            <div className="font-bold text-xl w-11/12">Rooms you may like to join:</div>
            <div className="w-11/12 flex flex-row flex-wrap">
                {
                    rooms_you_may_join.map((room,index) => {

                        function joinRoom(){
                            axios.post("/api/room/join",{ room_id:room._id },{
                                headers:{
                                    authorization:user.access_token
                                }
                            }).then((res) => {
                                if(res.data.status == "success"){
                                    window.location.reload();
                                }
                            }).catch((err) => {
                                console.log(err);
                            });
                        }

                        return(
                            <div key={index} className="w-1/5 flex flex-col py-2 items-center my-4 mx-5 hover:bg-gray-200 rounded">
                                <div className="w-full flex flex-col items-center">
                                    <img alt="profile_image" className="h-20 w-20 rounded-full object-cover" src={room.profile_image ? room.profile_image :"/profile.jpg"} />
                                </div>
                                <div className="flex flex-col items-center mx-4 my-2 flex-grow h-full">
                                    <div className="font-semibold text-lg text-gray-700">{room.name}</div>
                                    <div className="font-semibold text-xs text-zinc-400 mx-2">{room.total_members + " members"}</div>
                                </div>
                                <div onClick={joinRoom} className="text-xs font-mono font-semibold text-gray-200 cursor-pointer px-6 py-1 bg-sky-600 rounded-lg">JOIN</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
} 