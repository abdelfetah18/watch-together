import { useCookies } from "react-cookie";
import { generateToken } from "@/utils/encryption.js";
import client from "@/database/client.mjs";
import VideoPlayer from "@/components/room/VideoPlayer";
import RoomInfo from "@/components/room/RoomInfo";
import useWebSocket from "@/hooks/useWebSocket";

export async function getServerSideProps({ req, query }){
    const host_url = process.env.RENDER_EXTERNAL_HOSTNAME || "localhost";
    const ws_url = host_url.startsWith("localhost") ? "ws://"+host_url : "wss://"+host_url;
    
    try {
        var { id:room_id } = query;
        var user = req.user.data;
        var room = await client.getRoomIfIn(room_id, user.user_id);
        var _user = await client.getUser(user.user_id);
        var payload = { type:"invite", data:{ room_id }};
        var invite_token = await generateToken(payload);
    } catch(err) {
        return {
            redirect: {
                destination: '/profile',
                permanent: false
            }
        }
    }
    if(room){
        return {
            props:{ room, user: _user, invite_token, host_url, ws_url }
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

export default function Room({ user, room, invite_token, host_url, ws_url }) {
    const [cookies, setCookies, removeCookies] = useCookies(['access_token']);
    // FIXME: Make it simple.
    const _ws_url = (process.env.NODE_ENV === "production" ? ws_url : "ws://" + "127.0.0.1:4000") +"/?room_id="+room._id+"&access_token="+cookies.access_token;
    const ws = useWebSocket(_ws_url);

    return (
        <div className="flex flex-row w-screen h-screen items-center">
            <VideoPlayer user={user} room={room} ws={ws} />
            <RoomInfo user={user} room={room} invite_token={invite_token} ws={ws} host_url={host_url}/>
        </div>
    )
}