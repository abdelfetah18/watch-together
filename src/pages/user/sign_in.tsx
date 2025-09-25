import { saveUserSession, signIn } from "@/services/UserService";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaExclamationTriangle, FaInfoCircle } from "react-icons/fa";

export default function SignIn() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [apiError, setApiError] = useState("");
    const [apiSuccess, setApiSuccess] = useState("");

    async function signInHandler() {
        setIsLoading(true);

        setApiError("");
        setUsernameError("");
        setPasswordError("");

        let hasErrors = false;
        if (username.length == 0) {
            setUsernameError("Username field is required.");
            hasErrors = true;
        }

        if (password.length == 0) {
            setPasswordError("Password field is required.");
            hasErrors = true;
        }

        if (hasErrors) {
            setIsLoading(false);
            return;
        }

        const result = await signIn(username, password);
        if (result.isSuccess()) {
            saveUserSession(result.value);
            setApiSuccess("Sign in successfully.");
            router.push("/profile");
        } else {
            setApiError(result.error);
        }
        setIsLoading(false);
    }

    return (
        <div className="w-screen h-screen bg-dark-gray flex flex-col items-center justify-center">
            {isLoading && (
                <div className="absolute top-0 left-0 h-full w-full bg-gray-950/60 flex items-center justify-center z-50">
                    <div role="status">
                        <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )}
            <div className="lg:w-1/3 md:w-1/2 w-11/12 bg-dark-gray-bg drop-shadow-2xl py-10 rounded-lg flex flex-col items-center">
                <div className="w-full flex flex-col items-center px-8 gap-8">
                    <div className="w-full flex flex-col items-center gap-2">
                        <img src="/logo.png" className="w-20 object-contain" />
                        <div className="text-white text-3xl">Watch Together</div>
                    </div>
                    <div className="w-full flex flex-col items-center gap-4">
                        {
                            apiError.length > 0 && (
                                <div className="w-full flex items-center rounded text-white text-sm capitalize bg-red-900 py-3 px-4">
                                    <FaExclamationTriangle className="mr-2" />
                                    {apiError}
                                </div>
                            )
                        }

                        {
                            apiSuccess.length > 0 && (
                                <div className="w-full flex items-center rounded text-white text-sm capitalize py-3 px-4 bg-green-900">
                                    <FaInfoCircle className="mr-2" />
                                    {apiSuccess}
                                </div>
                            )
                        }
                        <div className="w-full flex flex-col items-center gap-2">
                            <label className="w-full text-white text-sm">Username:</label>
                            <input
                                onChange={(evt) => {
                                    setUsernameError("");
                                    setUsername(evt.target.value);
                                }}
                                className={`w-full py-2 px-6 rounded-lg bg-dark-gray/40 text-gray-300 placeholder:text-gray-500 outline-none focus:bg-dark-gray/30 duration-300 ${usernameError.length > 0 ? "border border-red-500" : ""}`}
                                type="text"
                                placeholder="Username"
                            />
                            {usernameError.length > 0 && <div className="w-full text-xs text-red-500">{usernameError}</div>}
                        </div>
                        <div className="w-full flex flex-col items-center gap-2">
                            <label className="w-full text-white text-sm">Password:</label>
                            <input
                                onChange={(evt) => {
                                    setPasswordError("");
                                    setPassword(evt.target.value);
                                }}
                                className={`w-full py-2 px-6 rounded-lg bg-dark-gray/40 text-gray-300 placeholder:text-gray-500 outline-none focus:bg-dark-gray/30 duration-300 ${passwordError.length > 0 ? "border border-red-500" : ""}`}
                                type="password"
                                placeholder="Password"
                            />
                            {passwordError.length > 0 && <div className="w-full text-xs text-red-500">{passwordError}</div>}
                        </div>
                        <div className="w-full text-sm cursor-pointer text-white">
                            {"Don't have an account ?"}
                            <Link href="/user/sign_up" className="ml-2 text-blue-600 hover:underline">Sign up</Link>
                        </div>
                    </div>
                    <div onClick={signInHandler} className="w-full cursor-pointer py-2 px-20 bg-blue-800 rounded-lg text-white text-center duration-300 hover:bg-blue-600 select-none active:scale-110">Sign in</div>
                </div>
            </div>
        </div>
    )
}