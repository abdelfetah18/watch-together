import client from "@/database/client.mjs";
import Navigation from "@/components/my_profile/Navigation"


export async function getServerSideProps({ req }){
    // FIXME: make it more simple like req.user is enogh.
    let user_id = req.user.data.user_id;
    let user = await client.getUser(user_id);
    let rooms = await client.getAlreadyInRooms(user_id);

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

export default function Profile({ user, rooms }){
    return(
        <div className="w-full h-screen bg-gray-900 flex flex-row font-mono">
            <Navigation user={user} selected_label={"MY ROOMS"} />
            <div className="w-5/6 h-full flex flex-col items-center py-4">
                <div className="w-11/12 h-full flex flex-col">
                    <div className="w-full text-lg font-semibold text-white">MY ROOMS</div>
                    <div className="w-full flex flex-row flex-wrap my-4">
                        {
                            rooms.map((room, index) => {
                                return(
                                    <div key={index} className="w-1/4 flex flex-col mb-4">
                                        <div className="w-11/12 h-full bg-gray-700 flex flex-col items-center rounded-lg">
                                            <img className="w-full object-contain rounded-t-lg" src={room.profile_image ?? "/thumb.png"} />
                                            <div className="w-11/12 flex-grow flex flex-col">
                                                <div className="text-base text-gray-100 font-medium py-2">{room.name}</div>
                                                <div className="text-sm text-gray-400">{room.description}</div>
                                                <div className="text-sm text-green-400 mt-2">{room.total_members} Members</div>
                                            </div>
                                            <a href={"/room/"+room._id} className="w-full text-white font-semibold py-2 bg-sky-800 text-center mt-4 rounded-b-lg">OPEN</a>
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