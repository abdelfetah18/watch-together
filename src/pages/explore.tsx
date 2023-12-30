import Navigation from "@/components/my_profile/Navigation"
import useExploreRooms from "@/hooks/useExploreRooms";
import Room from "@/components/room/Room";


export default function Explore() {
    const { rooms, joinRoom } = useExploreRooms();

    return (
        <div className="w-full h-screen dark:bg-gray-900 flex flex-row">
            <Navigation selected_label={"EXPLORE"} />
            <div className="w-5/6 h-full flex flex-col items-center py-4">
                <div className="w-11/12 flex-grow overflow-auto flex flex-col">
                    <div className="w-full text-lg font-semibold text-indigo-700 dark:text-indigo-50">EXPLORE</div>
                    <div className="w-full flex flex-row flex-wrap my-4">
                        {
                            rooms.map((room, index) => {
                                return (
                                    <div key={index} className="w-1/4 flex flex-col mb-4">
                                        <Room key={index} room={room} joinRoom={joinRoom} />
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