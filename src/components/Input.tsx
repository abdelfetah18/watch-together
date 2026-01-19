import { FieldBind } from "@/hooks/useField";
import { useState } from "react";

interface InputProps {
    bind?: FieldBind<string>;
    errorMessage?: string;
    type: React.HTMLInputTypeAttribute;
    placeholder: string;
}

export default function Input({ bind, errorMessage, type, placeholder }: InputProps) {
    const [error, setError] = useState(errorMessage);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        event.preventDefault();
        setError("");
        bind?.onChange(event.target.value);
    }

    return (
        <div className="w-full flex flex-col gap-2">
            <input
                value={bind?.value || ""}
                onChange={onChange}
                className={`
                    w-full rounded-lg bg-zinc-800 py-2 px-4 outline-none
                    ${error ? "border border-red-600 text-red-600" : "text-gray-50"}
                `}
                type={type}
                placeholder={placeholder}
            />
            {error && (<div className="text-xs text-red-500">{error}</div>)}
        </div>
    )
}