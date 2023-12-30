import { useEffect, useState } from "react";
import useAxios from "./useAxios";

export default function useRoomMemebers(room_id: string) {
    const axios = useAxios();
    const [room_members, setRoomMembers] = useState<RoomMember[]>([]);

    useEffect(() => {
        axios.post<HttpResponseData<RoomMember[]>, { room_id: string }>("/api/room/members", { room_id }).then(response => {
            if (response.status == "success") {
                setRoomMembers(response.data);
            }
        });
    }, []);

    return {
        room_members,
    };
}