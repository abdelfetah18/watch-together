import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import useAxios from "./useAxios";

export default function useUserSession() {
    const [userSession, setUserSession] = useState<UserSession>({ access_token: '', user_id: '', username: '' });
    const axios = useAxios();
    const [cookies] = useCookies(['access_token']);

    useEffect(() => {
        getUser();
        setUserSession(state => ({ ...state, access_token: cookies.access_token }));
    }, []);

    const getUser = () => {
        axios.get<HttpResponseData<User>>('/api/user').then(response => {
            if (response.status == 'success') {
                setUserSession(state => ({ ...state, username: response.data.username, user_id: response.data._id, user: response.data }));
            }
        });
    }

    return { userSession };
}