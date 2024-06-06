import { FaYoutube } from "react-icons/fa";

export default function SupportedList() {
    return (
        <div className="flex items-center w-full my-20">
            <div className="text-xl font-semibold text-gray-800 dark:text-gray-100">Our Supported Platforms:</div>
            <div className="ml-6 flex items-center">
                <div className="text-3xl text-red-600 dark:text-gray-100"><FaYoutube /></div>
                <div className="ml-2 text-lg font-medium text-gray-900">Youtube</div>
            </div>
        </div>
    )
}