import { useEffect, useState, useContext } from "react";
import ToastContext from "@/contexts/ToastContext";
import { getRooms, joinRoom } from "@/services/RoomService";
import { useRouter } from "next/router";

export default function useExploreRooms() {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const toastManager = useContext(ToastContext);
    const [rooms, setRooms] = useState<Room[]>([]);

    useEffect(() => {
        getRoomsHandler();
    }, []);

    async function getRoomsHandler(): Promise<void> {
        setIsLoading(true);
        const result = await getRooms();
        if (result.isSuccess()) {
            setRooms(result.value);
        } else {
            toastManager.alertError(result.error);
        }
        setIsLoading(false);
    }

    async function joinRoomHandler(roomId: string): Promise<void> {
        const result = await joinRoom(roomId);
        if (result.isSuccess()) {
            toastManager.alertSuccess("Room joined succesfuly");
            router.push(`/room/${roomId}`);

        } else {
            toastManager.alertError(result.error);
        }
    }

    return { isLoading, rooms, joinRoomHandler }
}