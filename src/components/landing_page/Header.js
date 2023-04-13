import { FaSignInAlt } from "react-icons/fa";

export default function Header(){
    return(
        <div className="flex flex-row items-center justify-between w-full px-10 h-16 bg-gray-800">
            <div className="text-white font-mono font-bold text-xl px-4 cursor-pointer">WatchTogether</div>
            <div className="flex flex-row items-center">
            <div className="text-white font-mono font-bold text-sm px-4 cursor-pointer">About</div>
            <div className="text-white font-mono font-bold text-sm px-4 cursor-pointer">FAQ</div>
            <div className="text-white font-mono font-bold text-sm px-4 cursor-pointer">Create-Room</div>
            <a href="/user/sign_in" className="text-white font-mono font-bold text-xl px-4 cursor-pointer"><FaSignInAlt /></a>
            </div>
        </div>
    )
}