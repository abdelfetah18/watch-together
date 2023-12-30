import { useEffect, useState } from "react";
import useAxios from "./useAxios";

export default function useRoomCategories() {
    const axios = useAxios();
    const [roomCategories, setRoomCategories] = useState<RoomCategory[]>([]);

    useEffect(() => {
        axios.get<HttpResponseData<RoomCategory[]>>("/api/room/categories").then(response => {
            if (response.status == 'success') {
                setRoomCategories(response.data);
            }
        });
    }, []);

    return {
        roomCategories
    };
}