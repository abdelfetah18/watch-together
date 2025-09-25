import { auth } from "@/services/UserService";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useUser() {
    const router = useRouter();
    const [user, setUser] = useState<User>({
        _id: "",
        profile_image: { url: "" },
        username: "",
    });

    useEffect(() => {
        getUser();
    }, []);

    async function getUser() {
        const result = await auth();
        if (result.isSuccess()) {
            setUser(result.value);
        } else {
            router.push("/user/sign_in");
        }
    }

    return { user };
}