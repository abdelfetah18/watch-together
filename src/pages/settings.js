import client from "@/database/client.mjs";
import Navigation from "@/components/my_profile/Navigation"
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

export default function Settings({ user }){
    return(
        <div className="w-full h-screen bg-gray-900 flex flex-row font-mono">
            <Navigation user={user} selected_label={"SETTINGS"} />
            <div className="w-5/6 h-full flex flex-col items-center py-4">
                <div className="w-11/12 flex-grow overflow-auto flex flex-col">
                    <div className="w-full text-lg font-semibold text-white">SETTINGS</div>
                   
                </div>
            </div>
        </div>
    )
}