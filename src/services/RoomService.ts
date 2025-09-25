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


export async function getRooms(): Promise<Result<string, Room[]>> {
    try {
        const response = await axios.get<HttpResponseData<Room[]>>("/api/explore");
        const body = response.data;
        return Result.success(body.data);
    } catch (error) {
        if (error.response) {
            const body = error.response.data;
            return Result.failure(body.message);
        }
    }
}

export async function joinRoom(roomId: string): Promise<Result<string, string>> {
    try {
        const response = await axios.post("/api/room/join", { room_id: roomId });
        const body = response.data;
        return Result.success(body);
    } catch (error) {
        if (error.response) {
            const body = error.response.data;
            return Result.failure(body.message);
        }
    }
}

export async function createRoom(
    name: string,
    bio: string,
    categories: RefDocument[],
    privacy: RoomPrivacy,
    password?: string): Promise<Result<Record<string, string>, Room>> {
    try {
        const response = await axios.post<HttpResponseData<Room>>("/api/room/create", {
            name: name,
            bio: bio,
            categories: categories,
            privacy: privacy,
            password: password,
        });
        const body = response.data;
        return Result.success(body.data);
    } catch (error) {
        if (error.response) {
            const body = error.response.data;
            return Result.failure(body.data);
        }
    }
}

export async function uploadProfileImage(roomId: string, profileImage: File): Promise<Result<string, Asset>> {
    try {
        const form = new FormData();
        form.append("room_id", roomId);
        form.append("profile_image", profileImage);

        const response = await axios.post<any, HttpResponseData<Asset>, FormData>("/api/room/upload_profile_image", form);
        const body = response.data;
        return Result.success(body.data);
    } catch (error) {
        if (error.response) {
            const body = error.response.data;
            return Result.failure(body.message);
        }
    }
}