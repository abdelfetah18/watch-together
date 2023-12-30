import { FaArrowDown, FaYoutube } from "react-icons/fa";

export default function SupportedList() {
    return (
        <div className="flex flex-col items-center w-full my-20">
            <div className="text-xl font-semibold text-indigo-800 dark:text-gray-100">SUPPORTED THIRD PARTY SERVICES:</div>
            <div className="text-2xl font-semibold text-indigo-800 dark:text-gray-100 my-4"><FaArrowDown /></div>
            <div className="text-5xl text-indigo-600 dark:text-gray-100"><FaYoutube /></div>
        </div>
    )
}