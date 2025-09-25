import Navigation from "@/components/my_profile/Navigation"
import useRooms from "@/hooks/useRooms";
import RoomsList from "@/components/room/RoomsList";
import RoomsListSkeleton from "@/components/room/RoomsListSkeleton";

export default function Profile() {
    const { isLoading, rooms } = useRooms();

    return (
        <div className="w-full h-screen dark:bg-dark-gray flex flex-row">
            <Navigation selected_label={"My Rooms"} />
            <div className="w-5/6 h-full flex flex-col items-center py-4 overflow-auto">
                <div className="w-11/12 h-full flex flex-col">
                    <div className="w-full text-xl py-4 font-medium text-gray-900 dark:text-gray-50">My Rooms</div>
                    {isLoading ? <RoomsListSkeleton /> : <RoomsList rooms={rooms} />}
                </div>
            </div>
        </div>
    )
}