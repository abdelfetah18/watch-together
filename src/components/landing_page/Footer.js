import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer(){
    return(
        <div className="flex flex-col w-full items-center bg-slate-800">
            <div className="flex flex-row items-center my-5">
                <div className="flex flex-row items-center text-white font-mono text-sm">
                    <div className="font-light">© copyright to</div>
                    <a href="https://github.com/abdelfetah18" className="ml-2 font-bold text-blue-500 hover:text-blue-700 duration-300">AbdelfetahDev</a>
                </div>
            </div>
        </div>
    )
}