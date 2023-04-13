import { FaPlus } from "react-icons/fa"
import Room from "./Room"

export default function MyRooms({ rooms, user }){
    return(
        <div className="w-1/3 flex flex-col flex-grow items-center">
            <div className="font-bold text-xl w-11/12">My Rooms:</div>

            <a href={"/room/create"} className="w-11/12 flex flex-col items-center bg-slate-200 rounded py-4 my-4 cursor-pointer">
                <FaPlus className="text-base" />
            </a>

            <div className="w-full flex-grow flex flex-col items-center">
            {
                rooms.map((room, index) => {
                    return <Room key={index} room={room} user={user} />
                })
            }
            </div>
        </div>
    )
}