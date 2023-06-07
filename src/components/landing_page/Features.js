import { FaCross, FaFacebookMessenger, FaInternetExplorer, FaMobile, FaMobileAlt, FaSmile, FaSync, FaThumbsUp, FaUsers } from "react-icons/fa";

const features = [
    {
        name: "Simultaneous Video Playback",
        description: "Enjoy synchronized video playback with friends, family, or colleagues in real time",
        Icon: FaSync
    },
    {
        name: "Seamless Chat Integration",
        description: "Discuss, react, and share your thoughts on the video with built-in chat functionality",
        Icon: FaFacebookMessenger
    },
    {
        name: "Cross-Platform Compatibility (Comming soon)",
        description: "Watch Together is available on desktop, mobile, and tablet devices, allowing you to connect with others anytime, anywhere.",
        Icon: FaMobileAlt
    },
    {
        name: "Personalized Recommendations",
        description: "Discover new content tailored to your interests and preferences",
        Icon: FaThumbsUp
    }
];

export default function Features(){
    return(
        <div className="w-full h-screen flex flex-col items-center justify-center">
            <div className="w-full text-white font-mono font-bold text-3xl py-10">Features:</div>
            <div className="flex flex-row items-center flex-wrap my-8">
                {
                    features.slice(0,2).map((Feature, Index) => {
                        return(
                            <div key={Index} className="flex-1 px-40 py-4 rounded-lg flex flex-col items-center hover:bg-gray-800 cursor-pointer duration-300">
                                <div className="font-mono font-bold text-5xl text-white"><Feature.Icon /></div>
                                <div className="py-4 font-mono font-bold text-center text-lg text-white">{Feature.name}</div>
                                <div className="font-mono text-sm text-white text-center">{Feature.description}</div>
                            </div>            
                        )
                    })
                }
            </div>
            <div className="flex flex-row items-center flex-wrap my-8">
                {
                    features.slice(2,4).map((Feature, Index) => {
                        return(
                            <div key={Index} className="flex-1 h-full px-40 py-4 rounded-lg flex flex-col items-center hover:bg-gray-800 cursor-pointer duration-300">
                                <div className="font-mono font-bold text-5xl text-white"><Feature.Icon /></div>
                                <div className="py-4 font-mono font-bold text-center text-lg text-white">{Feature.name}</div>
                                <div className="font-mono text-sm text-white text-center">{Feature.description}</div>
                            </div>            
                        )
                    })
                }
            </div>
        </div>
    )
}