import client from "@/database/client.mjs";
import Navigation from "@/components/my_profile/Navigation"
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";


export async function getServerSideProps({ req }){
    // FIXME: make it more simple like req.user is enogh.
    let user_id = req.user.data.user_id;
    let user = await client.getUser(user_id);

    if(user){
        return {
            props:{ user }
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

export default function Search({ user }){
    const [rooms, setRooms] = useState([]);
    const [query, setQuery] = useState("");

    async function Search(){
        let response = await axios.get("/api/search?query="+query);
        if(response.data.status == "success"){
            setRooms(response.data.data);
        }
    }

    async function onPress(event){
        if(event.code == "Enter"){
            Search(query);
        }
    }

    return(
        <div className="w-full h-screen bg-gray-900 flex flex-row font-mono">
            <Navigation user={user} selected_label={"SEARCH"} />
            <div className="w-5/6 h-full flex flex-col items-center py-4">
                <div className="w-11/12 h-full flex flex-col">
                    <div className="w-full text-lg font-semibold text-white">SEARCH</div>
                    <div className="w-1/3 my-8 flex items-center py-2 px-4 rounded-lg bg-gray-800">
                        <FaSearch className="text-gray-400 mr-4" />
                        <input className="flex-grow text-sm bg-transparent text-gray-50 placeholder:text-gray-400 outline-none" type="text" placeholder="Search..." value={query} onChange={(ev) => setQuery(ev.target.value)} onKeyDown={onPress} />
                    </div>
                    <div className="w-full flex flex-row flex-wrap my-4 overflow-auto">
                        {
                            rooms.map((room, index) => {
                                return(
                                    <Room key={index} room={room} />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

const Room = ({ room }) => {
    return (
        <div className="w-1/4 flex flex-col mb-4">
            <div className="w-11/12 h-full bg-gray-700 flex flex-col items-center rounded-lg">
                <img className="w-full object-contain rounded-t-lg" src={room.profile_image ? room.profile_image + "?h=300&w=400&fit=crop&crop=center" : "/profile_4_3.png"} />
                <div className="w-11/12 flex-grow flex flex-col">
                    <div className="text-base text-gray-100 font-medium py-2">{room.name}</div>
                    <div className="text-sm text-gray-400">{room.description}</div>
                    <div className="text-sm text-green-400 mt-2">{room.total_members} Members</div>
                </div>
                <a href={"/room/"+room._id} className="w-full text-white font-semibold py-2 bg-sky-800 text-center mt-4 rounded-b-lg">OPEN</a>
            </div>
        </div>
    )
}