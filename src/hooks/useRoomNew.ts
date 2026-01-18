import { getRoomById } from "@/services/RoomService";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const initialRoom: Room = {
    name: "",
    bio: "",
    categories: [],
    privacy: "public",
    profile_image: null,
    total_members: 0,
};

export default function useRoomNew() {
    const router = useRouter();
    const [room, setRoom] = useState<Room>(initialRoom);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (router.query.room_id) {
            getRoomById(router.query.room_id.toString())
                .then(result => {
                    if (result.isSuccess()) {
                        const room = result.value;
                        setRoom(room);
                    }
                })
                .catch(error => console.error(error))
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [router.query]);

    return {
        room,
        isLoading,
    };
}