import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { FaExclamationTriangle, FaInfoCircle } from "react-icons/fa";

export default function SignIn() {
    var [username, setUsername] = useState("");
    var [password, setPassword] = useState("");
    var [alert, setAlert] = useState({ status: "", message: "" });
    const [, setAccessToken] = useCookies(['access_token']);

    function sign_in() {
        if (username.length > 0 && password.length > 0) {
            axios.post("/api/auth/sign_in", { username, password }, {
                headers: {
                    "content-type": "application/json"
                }
            }).then((result) => {
                setAlert(result.data);
                if (result.data.status == "success") {
                    setAccessToken("access_token", result.data.data.token, { path: "/" });
                    window.location.href = "/profile";
                }
            });
        }
    }

    return (
        <div className="w-screen h-screen bg-dark-gray flex flex-col items-center justify-center">
            <div className="w-1/3 py-10 rounded-lg flex flex-col items-center">
                <img src="/logo.png" className="w-36 object-contain" />
                <div className="font-medium text-gray-50 text-3xl">Watch Together</div>
                <div className="w-11/12 flex flex-col items-center mt-8">
                    <div className={"w-11/12 flex items-center rounded text-white text-sm capitalize" + (alert.status.length > 0 ? " block py-3 px-4 mb-2" : "hidden") + (alert.status == "success" ? " bg-green-900" : " bg-red-900")}>
                        {alert.status == "success" && <FaInfoCircle className="mr-2" />}
                        {alert.status == "error" && <FaExclamationTriangle className="mr-2" />}
                        {alert.message}
                    </div>
                    <label className="w-11/12 text-slate-200 text-sm py-2">Username:</label>
                    <input onChange={(evt) => setUsername(evt.target.value)} className="w-11/12 py-2 px-6 rounded-lg bg-dark-gray-bg text-gray-300 placeholder:text-gray-500 outline-none focus:scale-105 duration-300" type="text" placeholder="Username" />
                    <label className="w-11/12 text-slate-200 text-sm mt-6 py-2">Password:</label>
                    <input onChange={(evt) => setPassword(evt.target.value)} className="w-11/12 py-2 px-6 rounded-lg bg-dark-gray-bg text-gray-300 placeholder:text-gray-500 outline-none focus:scale-105 duration-300" type="password" placeholder="Password" onKeyDown={(ev) => { if (ev.key === "Enter") { sign_in(); } }} />
                </div>
                <div className="w-5/6 text-sm py-2 cursor-pointer text-zinc-300">
                    {"Don't have an account ?"}
                    <a href="/user/sign_up" className="ml-2 text-indigo-600 active:scale-105 duration-300">Sign up</a>
                </div>

                <div onClick={sign_in} className="mt-8 cursor-pointer py-2 px-20 bg-blue-800 rounded-lg text-gray-50 text-center duration-300 hover:bg-blue-600 select-none active:scale-110">Sign In</div>
            </div>
        </div>
    )
}