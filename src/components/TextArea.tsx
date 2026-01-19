import { FieldBind } from "@/hooks/useField";
import { useState } from "react";

interface InputProps {
    bind?: FieldBind<string>;
    errorMessage?: string;
    placeholder: string;
    rows?: number;
}

export default function TextArea({ bind, errorMessage, placeholder, rows }: InputProps) {
    const [error, setError] = useState(errorMessage);

    const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        event.preventDefault();
        setError("");
        bind?.onChange(event.target.value);
    }

    return (
        <div className="w-full flex flex-col gap-2">
            <textarea
                value={bind?.value || ""}
                onChange={onChange}
                rows={rows || 2}
                className={`
                    w-full rounded-lg bg-zinc-800 py-2 px-4 outline-none
                    ${error ? "border border-red-600 text-red-600" : "text-gray-50"}
                `}
                placeholder={placeholder}
            />
            {error && (<div className="text-xs text-red-500">{error}</div>)}
        </div>
    )
}