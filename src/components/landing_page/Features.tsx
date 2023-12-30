import { IconType } from "react-icons";
import { FaFacebookMessenger, FaMobileAlt, FaSync, FaThumbsUp } from "react-icons/fa";

interface Feature {
    name: string;
    description: string;
    Icon: IconType;
};


export default function Features() {
    return (
        <div className="w-full flex flex-col items-center justify-center mb-20">
            <div className="w-full flex">
                {
                    features.map((feature, index) => {
                        return (
                            <div key={index} className="w-1/4 flex flex-col items-center">
                                <div className="w-11/12 flex flex-col items-center">
                                    <div className="text-3xl text-indigo-700 dark:text-gray-100"><feature.Icon /></div>
                                    <div className="text-center mt-2 mb-4 text-lg font-semibold text-indigo-700 dark:text-gray-100">{feature.name}</div>
                                    <div className="w-3/4 text-center text-sm text-indigo-800 font-semibold dark:text-gray-200">{feature.description}</div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

const features: Feature[] = [
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
        name: "Cross-Platform Compatibility",
        description: "Watch Together is available on desktop, mobile, and tablet devices, allowing you to connect with others anytime, anywhere.",
        Icon: FaMobileAlt
    },
    {
        name: "Personalized Recommendations",
        description: "Discover new content tailored to your interests and preferences",
        Icon: FaThumbsUp
    }
];