import Room from "./Room";

interface RoomsListProps {
    rooms: Room[];
    joinRoom?: (room_id: string) => void;
}

export default function RoomsList({ rooms, joinRoom }: RoomsListProps) {
    return (
        <div className="w-full grid grid-cols-4 gap-4 gap-y-8">
            {rooms.map((room, index) => <Room key={index} room={room} joinRoom={joinRoom} />)}
        </div>
    );
}