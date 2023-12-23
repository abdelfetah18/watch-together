import { FaSignInAlt } from "react-icons/fa";

export default function Header(){

    function scrollTo(index){
        return (ev) => {
            if(window){
                const screen_height = window.screen.height;
                window.scrollTo({ behavior: "smooth", top: screen_height * index });
            } 
        }
    }

    return(
        <div className="sticky top-0 flex flex-row items-center justify-between w-full px-10 h-16 bg-gray-800">
            <div className="flex items-center cursor-pointer">
                <img className="h-10" src="/logo.png" />
                <div className="text-gray-50 font-mono font-semibold ml-2">Watch Together</div>
            </div>
            <div className="flex flex-row items-center">
            <div onClick={scrollTo(1)} className="text-white font-mono font-semibold text-sm px-4 cursor-pointer hover:text-blue-600 hover:font-semibold duration-300 uppercase">Features</div>
            <div onClick={scrollTo(2)} className="text-white font-mono font-semibold text-sm px-4 cursor-pointer hover:text-blue-600 hover:font-semibold duration-300 uppercase">FAQ</div>
            <div className="text-white font-mono font-semibold text-sm px-4 cursor-pointer hover:text-blue-600 hover:font-semibold duration-300 uppercase">Create-Room</div>
            <a href="/user/sign_in" className="text-white font-mono font-bold text-xl px-4 cursor-pointer"><FaSignInAlt /></a>
            </div>
        </div>
    )
}