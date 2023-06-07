import { FaSignInAlt } from "react-icons/fa";

export default function Header(){
    return(
        <div className="sticky top-0 flex flex-row items-center justify-between w-full px-10 h-16 bg-gray-800">
            <div className="text-white font-mono font-semibold text-2xl px-4 cursor-pointer">WatchTogether</div>
            <div className="flex flex-row items-center">
            <div className="text-white font-mono font-medium text-sm px-4 cursor-pointer hover:text-blue-600 hover:font-semibold duration-300">About</div>
            <div className="text-white font-mono font-medium text-sm px-4 cursor-pointer hover:text-blue-600 hover:font-semibold duration-300">FAQ</div>
            <div className="text-white font-mono font-medium text-sm px-4 cursor-pointer hover:text-blue-600 hover:font-semibold duration-300">Create-Room</div>
            <a href="/user/sign_in" className="text-white font-mono font-bold text-xl px-4 cursor-pointer"><FaSignInAlt /></a>
            </div>
        </div>
    )
}