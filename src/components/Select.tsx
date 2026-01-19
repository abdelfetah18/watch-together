import SelectContext from "@/contexts/SelectContext";
import { FieldBind } from "@/hooks/useField";
import { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

interface SelectProps {
    children: React.ReactNode[];
    bind?: FieldBind<string>;
    errorMessage?: string;
}

export default function Select({ children, bind, errorMessage }: SelectProps) {
    const [currentSelectedItem, setCurrentSelectedItem] = useState({ id: (bind?.value || ""), value: "" });
    const [showAll, setShowAll] = useState(false);
    const [error, setError] = useState(errorMessage);

    const select = (item): void => {
        setCurrentSelectedItem(item);
        setShowAll(false);
        bind?.onChange(item.id);
        setError("");
    }

    return (
        <SelectContext.Provider value={{ currentSelectedItem, select, showAll }}>
            <div className="relative w-full flex flex-col items-center gap-2">
                <div className="w-full relative">
                    <div
                        className={`
                        w-full flex flex-row items-center justify-between text-gray-50 bg-zinc-800 py-2 px-4 rounded-lg
                        ${error ? "border border-red-600 text-red-600" : "text-gray-50"}
                    `}
                        onClick={() => setShowAll(state => !state)}>
                        <div>{currentSelectedItem.value || "Click to Select"}</div>
                        {showAll ? <FaAngleUp /> : <FaAngleDown />}
                    </div>
                    <div className="absolute top-full mt-1 w-full max-h-60 flex flex-col items-center bg-zinc-800 rounded-lg overflow-auto">
                        {children}
                    </div>
                </div>
                {error && (<div className="w-full text-xs text-red-500">{error}</div>)}
            </div>
        </SelectContext.Provider>
    )
}