interface Feature {
    title: string;
    description: string;
    image_name: string;
    image_side: 'left' | 'right'
};

export default function FeaturesDescription() {
    return (
        <div className="w-full flex flex-col items-center justify-center my-20">
            <div className="w-full flex flex-col">
                {
                    features.map((feature, index) => {
                        return (
                            <div key={index} className="w-full flex items-center mb-10 last:mb-0" style={{ direction: feature.image_side == 'left' ? 'rtl' : 'ltr' }}>
                                <div className="aspect-video w-1/2 flex items-center justify-center rounded-lg">
                                    <img src={`/images/landing_page/${feature.image_name}`} className="rounded-lg" />
                                </div>
                                <div className="w-1/2 px-4 flex flex-col text-left items-baseline">
                                    <div className="w-full mb-2 text-2xl font-bold text-gray-900 dark:text-gray-100">{feature.title}</div>
                                    <div className="w-2/3 text-gray-800 dark:text-gray-200">{feature.description}</div>
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
        title: "Feel Like You're in the Same Room",
        description: "Thanks to our Simultaneous Video Playback, everyone watches at the exact same time. No more worrying about syncing—just press play and enjoy together.",
        image_name: '1.png',
        image_side: 'left'
    },
    {
        title: "Chat Without Missing a Beat",
        description: "Our Seamless Chat Integration keeps the conversation flowing smoothly. Share your thoughts and reactions instantly, just like you would in person.",
        image_name: '2.png',
        image_side: 'right'
    },
    {
        title: "Stay Connected on Any Device",
        description: "Whether you’re on your phone, tablet, or computer, Watch Together works seamlessly across all platforms, ensuring a consistent viewing experience for everyone.",
        image_name: '3.png',
        image_side: 'left'
    },
    {
        title: "Discover New Favorites",
        description: "Our Personalized Recommendations feature suggests videos based on your interests, making it easy to find something everyone will love.",
        image_name: '4.png',
        image_side: 'right'
    }
];