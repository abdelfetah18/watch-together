import Result from "@/utils/Result";
import axios from "axios";

export async function getUserRooms(): Promise<Result<string, Room[]>> {
    try {
        const response = await axios.get<HttpResponseData<Room[]>>("/api/user/rooms");
        const body = response.data;
        return Result.success(body.data);
    } catch (error) {
        if (error.response) {
            const body = error.response.data;
            return Result.failure(body.message);
        }
    }
}

export async function search(query: string): Promise<Result<string, Room[]>> {
    try {
        const response = await axios.get<HttpResponseData<Room[]>>(`/api/search?query=${query}`);
        const body = response.data;
        return Result.success(body.data);
    } catch (error) {
        if (error.response) {
            const body = error.response.data;
            return Result.failure(body.message);
        }
    }
}