import { IconType } from "react-icons";
import { FaFacebookMessenger, FaMobileAlt, FaSync, FaThumbsUp } from "react-icons/fa";

interface Feature {
    name: string;
    description: string;
    Icon: IconType;
};


export default function Features() {
    return (
        <div className="w-full flex flex-col items-center justify-center gap-12">
            <div className="text-4xl font-semibold text-gray-900 dark:text-gray-50">Why Choose Watch Together?</div>
            <div className="w-full grid grid-cols-4 gap-8">
                {
                    features.map((feature, index) => {
                        return (
                            <div key={index} className="w-full flex flex-col items-center gap-2">
                                <div className="w-full flex flex-col items-center gap-4">
                                    <div className="text-5xl text-indigo-700 dark:text-gray-100"><feature.Icon /></div>
                                    <div className="text-center text-lg font-semibold text-gray-900 dark:text-gray-100">{feature.name}</div>
                                </div>
                                <div className="w-full text-center text-gray-800 dark:text-gray-200">{feature.description}</div>
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