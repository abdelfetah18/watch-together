import { FaArrowDown, FaYoutube } from "react-icons/fa";

export default function SupportedList(){
    return(
        <div className="flex flex-col items-center w-full my-20">
            <div className="text-2xl font-mono font-bold text-white">Currently We Support:</div>
            <div className="text-2xl font-mono font-bold text-white my-4"><FaArrowDown /></div>
            <div className="text-5xl font-mono font-bold text-white"><FaYoutube /></div>
        </div>
    )
}