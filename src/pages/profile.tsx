import Navigation from "@/components/my_profile/Navigation"
import useRooms from "@/hooks/useRooms";
import Room from "@/components/room/Room";

export default function Profile() {
    const { rooms } = useRooms();

    return (
        <div className="w-full h-screen dark:bg-dark-gray flex flex-row">
            <Navigation selected_label={"My Rooms"} />
            <div className="w-5/6 h-full flex flex-col items-center py-4 overflow-auto">
                <div className="w-11/12 h-full flex flex-col">
                    <div className="w-full text-xl py-4 font-medium text-gray-900 dark:text-gray-50">My Rooms</div>
                    <div className="w-full flex flex-row flex-wrap my-4">
                        {
                            rooms.map((room, index) => {
                                return (
                                    <div className="w-1/4 flex flex-col mb-8">
                                        <Room key={index} room={room} />
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