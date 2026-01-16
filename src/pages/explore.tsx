import useExploreRooms from "@/hooks/useExploreRooms";
import RoomsList from "@/components/room/RoomsList";
import RoomsListSkeleton from "@/components/room/RoomsListSkeleton";
import App from "@/components/Layout/App";
import Navigation from "@/components/my_profile/Navigation";

export default function Explore() {
    const { rooms, isLoading, joinRoomHandler } = useExploreRooms();

    return (
        <App title="explore">
            <Navigation selected_label={"Explore"} />
            <div className="w-4/5 h-full px-8 py-2 flex flex-col overflow-auto">
                <div className="w-full text-xl py-4 font-medium text-gray-900 dark:text-gray-50">Explore</div>
                {isLoading ? <RoomsListSkeleton /> : <RoomsList rooms={rooms} joinRoom={joinRoomHandler} />}
            </div>
        </App>
    )
}
