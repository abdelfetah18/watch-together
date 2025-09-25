import { getUserRooms } from "@/services/RoomService";
import { useEffect, useState } from "react";

export default function useRooms() {
    const [isLoading, setIsLoading] = useState(false);
    const [rooms, setRooms] = useState<Room[]>([]);

    useEffect(() => {
        getRooms();
    }, []);

    async function getRooms() {
        setIsLoading(true);
        const result = await getUserRooms();
        if (result.isSuccess()) {
            setRooms(result.value);
        }
        setIsLoading(false);
    }

    return { isLoading, rooms };
}