import { useEffect, useState, useContext } from "react";
import useAxios from "./useAxios";
import LoadingContext from "@/contexts/LoadingContext";
import ToastContext from "@/contexts/ToastContext";

export default function useExploreRooms() {
    const loading = useContext(LoadingContext);
    const toastManager = useContext(ToastContext);
    const axios = useAxios();
    const [rooms, setRooms] = useState<Room[]>([]);

    useEffect(() => {
        getRooms();
    }, []);

    const getRooms = () => {
        axios.get<HttpResponseData<Room[]>>("/api/explore").then(response => {
            if (response.status == "success") {
                setRooms(response.data);
            }
        });
    }

    const joinRoom = (room_id: string): void => {
        loading.show();
        axios.post<HttpResponseData<Room>, { room_id: string }>("/api/room/join", { room_id }).then(response => {
            loading.hide();
            if (response.status == "success") {
                toastManager.alertSuccess("Room Join success");
                setRooms(state => state.filter(r => r._id != room_id));
            } else {
                toastManager.alertError("Something went wrong");
            }
        });
    }

    return { rooms, joinRoom }
}