import { useEffect, useState } from "react";
import useAxios from "./useAxios";

export default function useRooms() {
    const axios = useAxios();
    const [rooms, setRooms] = useState<Room[]>([]);

    useEffect(() => {
        getRooms();
    }, []);

    const getRooms = () => {
        axios.get<HttpResponseData<Room[]>>("/api/user/rooms").then(data => {
            if (data.status == "success") {
                setRooms(data.data);
            }
        });
    }

    return { rooms };
}