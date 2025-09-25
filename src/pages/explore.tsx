import Navigation from "@/components/my_profile/Navigation"
import useExploreRooms from "@/hooks/useExploreRooms";
import RoomsList from "@/components/room/RoomsList";
import RoomsListSkeleton from "@/components/room/RoomsListSkeleton";

export default function Explore() {
    const { rooms, isLoading, joinRoomHandler } = useExploreRooms();

    return (
        <div className="w-full h-screen dark:bg-dark-gray flex flex-row">
            <Navigation selected_label={"Explore"} />
            <div className="w-5/6 h-full flex flex-col items-center py-4 overflow-auto">
                <div className="w-11/12 flex-grow flex flex-col">
                    <div className="w-full text-xl py-4 font-medium text-gray-900 dark:text-gray-50">Explore</div>
                    {isLoading ? <RoomsListSkeleton /> : <RoomsList rooms={rooms} joinRoom={joinRoomHandler} />}
                </div>
            </div>
        </div>
    )
}