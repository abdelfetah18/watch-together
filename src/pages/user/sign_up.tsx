import LoadingComponent from "@/components/LoadingComponent";
import { saveUserSession, signUp } from "@/services/UserService";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { FaExclamationTriangle, FaInfoCircle } from "react-icons/fa";

export default function SignUp() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState("");

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");

    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [apiError, setApiError] = useState("");
    const [apiSuccess, setApiSuccess] = useState("");

    async function signUpHandler(event: FormEvent) {
        event.preventDefault();
        setIsLoading(true);

        setApiError("");
        setUsernameError("");
        setEmailError("");
        setPasswordError("");

        let hasErrors = false;
        if (username.length == 0) {
            setUsernameError("Username field is required.");
            hasErrors = true;
        }

        if (email.length == 0) {
            setEmailError("Email field is required.");
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

        const result = await signUp(username, email, password);
        if (result.isSuccess()) {
            saveUserSession(result.value);
            setApiSuccess("Sign up successfully.");
            router.push("/explore");
        } else {
            setApiError(result.error);
        }
        setIsLoading(false);
    }

    return (
        <div className="w-screen h-screen bg-dark-gray flex flex-col items-center justify-center">
            {isLoading && <LoadingComponent />}
            <div className="lg:w-1/3 md:w-1/2 w-11/12 bg-dark-gray-bg drop-shadow-2xl py-10 rounded-lg flex flex-col items-center">
                <form onSubmit={signUpHandler} className="w-full flex flex-col items-center px-8 gap-8">
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
                                className={`w-full py-2 px-6 rounded-lg bg-dark-gray/40 text-gray-300 placeholder:text-gray-500 outline-none focus:bg-dark-gray/30 duration-300 border-red-500 ${usernameError.length > 0 ? "border" : ""}`}
                                type="text"
                                placeholder="Username"
                            />
                            {usernameError.length > 0 && <div className="w-full text-xs text-red-500">{usernameError}</div>}
                        </div>
                        <div className="w-full flex flex-col items-center gap-2">
                            <label className="w-full text-white text-sm">Email:</label>
                            <input
                                onChange={(evt) => {
                                    setEmailError("");
                                    setEmail(evt.target.value);
                                }}
                                className={`w-full py-2 px-6 rounded-lg bg-dark-gray/40 text-gray-300 placeholder:text-gray-500 outline-none focus:bg-dark-gray/30 duration-300 border-red-500 ${emailError.length > 0 ? "border" : ""}`}
                                type="email"
                                placeholder="Email"
                            />
                            {emailError.length > 0 && <div className="w-full text-xs text-red-500">{emailError}</div>}
                        </div>
                        <div className="w-full flex flex-col items-center gap-2">
                            <label className="w-full text-white text-sm">Password:</label>
                            <input
                                onChange={(evt) => {
                                    setPasswordError("");
                                    setPassword(evt.target.value);
                                }}
                                className={`w-full py-2 px-6 rounded-lg bg-dark-gray/40 text-gray-300 placeholder:text-gray-500 outline-none focus:bg-dark-gray/30 duration-300 border-red-500 ${passwordError.length > 0 ? "border" : ""}`}
                                type="password"
                                placeholder="Password"
                            />
                            {passwordError.length > 0 && <div className="w-full text-xs text-red-500">{passwordError}</div>}
                        </div>
                        <div className="w-full text-sm cursor-pointer text-white">
                            {"Already have an account ?"}
                            <Link href="/user/sign_in" className="ml-2 text-blue-600 hover:underline">Sign in</Link>
                        </div>
                    </div>
                    <button type="submit" className="w-full cursor-pointer py-2 px-20 bg-blue-800 rounded-lg text-white text-center duration-300 hover:bg-blue-600 select-none active:scale-110">Sign up</button>
                </form>
            </div>
        </div>
    )
}