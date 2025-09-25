import Room from "./Room";

interface RoomsListProps {
    rooms: Room[];
}

export default function RoomsList({ rooms }: RoomsListProps) {
    return (
        <div className="w-full grid grid-cols-4 gap-4 gap-y-8">
            {rooms.map((room, index) => <Room key={index} room={room} />)}
        </div>
    );
}