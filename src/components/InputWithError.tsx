import { Dispatch, SetStateAction } from "react";

interface InputWithErrorProps {
    placeholder: string;
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
    valueError: string;
    setValueError: Dispatch<SetStateAction<string>>;
}

export default function InputWithError({ placeholder, value, setValue, valueError, setValueError }: InputWithErrorProps) {
    return (
        <div className="w-full flex flex-col items-center gap-2">
            <input
                value={value}
                onChange={(evt) => {
                    setValueError("");
                    setValue(evt.target.value);
                }}
                className={`w-full py-2 px-6 rounded-lg bg-gray-100 dark:bg-dark-gray-bg text-gray-900 dark:text-gray-50 placeholder:text-gray-300 dark:placeholder:text-gray-500 outline-none focus:bg-dark-gray/30 duration-300 ${valueError.length > 0 ? "border border-red-500" : ""}`}
                type="text"
                placeholder={placeholder}
            />
            {valueError.length > 0 && <div className="w-full text-xs text-red-500">{valueError}</div>}
        </div>
    )
}