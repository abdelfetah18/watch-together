import { useEffect } from "react";
import { useCookies } from "react-cookie";

export default function SignOut() {
    const [, , removeAccessToken] = useCookies(['access_token']);
    useEffect(() => {
        removeAccessToken("access_token", { path: "/" });
        window.location.href = "/user/sign_in";
    }, []);

    return (
        <div className="font-bold text-base">
            Sign Out ...
        </div>
    )
}