import { Dispatch, SetStateAction, useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface PasswordInputProps {
    setPasswordError: Dispatch<SetStateAction<string>>;
    setPassword: Dispatch<SetStateAction<string>>;
    password: string;
    hasError: boolean;
}

export default function PasswordInput({ setPasswordError, setPassword, password, hasError }: PasswordInputProps) {
    const inputRef = useRef<HTMLInputElement>();
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword(state => !state);
        if (inputRef.current.type == 'password') {
            inputRef.current.type = 'text';
        } else {
            inputRef.current.type = 'password';
        }
    }

    return (
        <div className={`w-full bg-gray-100 text-gray-900 dark:text-gray-50 flex items-center dark:bg-dark-gray-bg rounded-lg px-4 ${hasError ? "border border-red-500" : ""}`}>
            <input
                ref={inputRef}
                onChange={(ev) => {
                    setPasswordError("");
                    setPassword(ev.target.value);
                }}
                value={password}
                className="flex-grow bg-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500 py-2 outline-none" type="password" placeholder="Password" />
            <div onClick={togglePassword}>
                {
                    showPassword ? (
                        <FaEyeSlash className="cursor-pointer hover:text-gray-400 select-none" />
                    ) : (
                        <FaEye className="cursor-pointer hover:text-gray-400 select-none" />
                    )
                }
            </div>
        </div>
    )
}