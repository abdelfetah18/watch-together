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

export async function searchYoutube(query: string): Promise<Result<string, YoutubeVideo[]>> {
    try {
        const response = await axios.get(`/api/room/youtube_search?q=${query}`);
        const body = response.data;
        return Result.success(body.data.videos);
    } catch (error) {
        if (error.response) {
            const body = error.response.data;
            return Result.failure(body.message);
        }
    }
}


export async function getRoomById(id: string): Promise<Result<string, Room>> {
    try {
        const response = await axios.get<HttpResponseData<Room[]>>(`/api/room/${id}`);
        const body = response.data;
        return Result.success(body.data);
    } catch (error) {
        if (error.response) {
            const body = error.response.data;
            return Result.failure(body.message);
        }
    }
}

export async function getMessages(roomId: string): Promise<Result<string, Message[]>> {
    try {
        const response = await axios.get<HttpResponseData<Message[]>>(`/api/room/chat?room_id=${roomId}`);
        const body = response.data;
        return Result.success(body.data);
    } catch (error) {
        if (error.response) {
            const body = error.response.data;
            return Result.failure(body.message);
        }
    }
}

export async function getInviteURL(roomId: string): Promise<Result<string, string>> {
    try {
        const response = await axios.post("/api/room/invite_url", { room_id: roomId });
        const body = response.data;
        return Result.success(body.data);
    } catch (error) {
        if (error.response) {
            const body = error.response.data;
            return Result.failure(body.message);
        }
    }
}

export async function getMembers(roomId: string): Promise<Result<string, RoomMember[]>> {
    try {
        const response = await axios.post("/api/room/members", { room_id: roomId });
        const body = response.data;
        return Result.success(body.data);
    } catch (error) {
        if (error.response) {
            const body = error.response.data;
            return Result.failure(body.message);
        }
    }
}

export async function updateRoom(roomId: string, updateRoomForm: UpdateRoomForm): Promise<Result<Record<string, string>, Room>> {
    try {
        const response = await axios.patch<HttpResponseData<Room>>(`/api/room/${roomId}`, updateRoomForm);
        const body = response.data;
        return Result.success(body.data);
    } catch (error) {
        if (error.response) {
            const body = error.response.data;
            return Result.failure(body.data);
        }
    }
}