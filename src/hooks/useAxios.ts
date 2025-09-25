import axios from "axios";

export default function useAxios() {
    const get = async <T>(url: string): Promise<T> => {
        return await axios.get<T>(url).then(response => response.data);
    }

    const post = async <T, P>(url: string, body: P): Promise<T> => {
        return await axios.post<T>(url, body).then(response => response.data);
    }

    return { get, post };
}