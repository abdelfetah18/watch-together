import UserSessionContext from "@/contexts/UserSessionContext";
import axios from "axios";
import { useContext, useEffect } from "react";

export default function useAxios() {
    const userSession = useContext(UserSessionContext);

    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = `${userSession.access_token}`;
    }, []);

    const get = async <T>(url: string): Promise<T> => {
        return await axios.get<T>(url).then(response => response.data);
    }

    const post = async <T, P>(url: string, body: P): Promise<T> => {
        return await axios.post<T>(url, body).then(response => response.data);
    }

    return { get, post };
}