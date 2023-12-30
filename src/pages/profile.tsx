import Navigation from "@/components/my_profile/Navigation"
import useRooms from "@/hooks/useRooms";
import Room from "@/components/room/Room";

export default function Profile() {
    const { rooms } = useRooms();

    return (
        <div className="w-full h-screen dark:bg-gray-900 flex flex-row">
            <Navigation selected_label={"MY ROOMS"} />
            <div className="w-5/6 h-full flex flex-col items-center py-4">
                <div className="w-11/12 h-full flex flex-col">
                    <div className="w-full text-lg font-semibold  text-indigo-700 dark:text-indigo-50">MY ROOMS</div>
                    <div className="w-full flex flex-row flex-wrap my-4 overflow-auto">
                        {
                            rooms.map((room, index) => {
                                return (
                                    <div className="w-1/4 flex flex-col mb-4">
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