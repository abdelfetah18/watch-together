import { FaYoutube } from "react-icons/fa";

export default function SupportedList() {
    return (
        <div className="w-full flex flex-col items-center gap-8">
            <div className="text-4xl font-semibold text-black dark:text-white">Our Supported Platforms</div>
            <div className="flex items-center gap-2">
                <div className="text-5xl text-red-600 dark:text-white"><FaYoutube /></div>
                <div className="text-3xl text-gray-900">Youtube</div>
            </div>
        </div>
    )
}