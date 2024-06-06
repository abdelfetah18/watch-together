import Navigation from "@/components/my_profile/Navigation"
import useExploreRooms from "@/hooks/useExploreRooms";
import Room from "@/components/room/Room";


export default function Explore() {
    const { rooms, joinRoom } = useExploreRooms();

    return (
        <div className="w-full h-screen dark:bg-dark-gray flex flex-row">
            <Navigation selected_label={"Explore"} />
            <div className="w-5/6 h-full flex flex-col items-center py-4 overflow-auto">
                <div className="w-11/12 flex-grow flex flex-col">
                    <div className="w-full text-xl py-4 font-medium text-gray-900 dark:text-gray-50">Explore</div>
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