import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer(){
    return(
        <div className="flex flex-col w-full items-center bg-slate-800">
            <div className="flex flex-row w-11/12 flex-wrap justify-between">
            <div className="flex flex-row items-center my-5">
                <div className="font-mono text-white mx-2 text-xl"><FaFacebook /></div>
                <div className="font-mono text-white mx-2 text-xl"><FaTwitter /></div>
                <div className="font-mono text-white mx-2 text-xl"><FaInstagram /></div>
            </div>
            </div>
        </div>
    )
}