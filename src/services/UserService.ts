import Result from "@/utils/Result";
import axios from "axios";

export async function signIn(username: string, password: string): Promise<Result<string, UserSession>> {
    try {
        const response = await axios.post("/api/auth/sign_in", { username, password });
        const body = response.data;
        return Result.success(body.data);
    } catch (error) {
        if (error.response) {
            const body = error.response.data;
            return Result.failure(body.message);
        }
    }
}

export function saveUserSession(userSession: UserSession): void {
    localStorage.setItem("user_session", JSON.stringify(userSession));
}