import ChatBox from "./ChatBox";
import RoomCard from "./RoomCard";

interface RoomInfoProps {
    room: Room;
}

export default function RoomInfo({ room }: RoomInfoProps) {
    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full flex flex-col items-center gap-4">
                <RoomCard room={room} />
                <ChatBox room={room} />
            </div>
        </div>
    )
}
