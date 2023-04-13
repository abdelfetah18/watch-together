import { FaSmile, FaSync, FaUsers } from "react-icons/fa";

export default function Features(){
    return(
        <div className="flex flex-row justify-between flex-wrap w-full">
            <div className="w-1/4 rounded-lg flex flex-col items-center">
                <div className="font-mono font-bold text-5xl text-white"><FaUsers /></div>
                <div className="py-4 font-mono font-bold text-lg text-white">Watch Together</div>
                <div className="font-mono text-sm text-white text-center">
                { ("Virtual movie night with your partner, friends, family, or colleagues? We've got you covered! Gather as many people as you like!")}
                </div>
            </div>
            <div className="w-1/4 rounded-lg flex flex-col items-center">
                <div className="font-mono font-bold text-5xl text-white"><FaSync /></div>
                <div className="py-4 font-mono font-bold text-lg text-white ">Auto Sync</div>
                <div className="font-mono text-sm text-white text-center">
                { ("No more 3, 2, 1...we'll handle the video synchronization for you!") }
                </div>
            </div>
            <div className="w-1/4 rounded-lg flex flex-col items-center">
                <div className="font-mono font-bold text-5xl text-white"><FaSmile /></div>
                <div className="py-4 font-mono font-bold text-lg text-white">Laugh Together</div>
                <div className="font-mono text-sm text-white text-center">
                { ("Use your webcams to see your friends' reactions real-time and live-chat - the next best thing to being together!") }
                </div>
            </div>
        </div>
    )
}