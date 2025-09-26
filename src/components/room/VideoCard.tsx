interface VideoCardProps {
    selectVideo: (videoId: string) => void;
    videoId: string;
    thumbnail: string;
    title: string;
    channelName: string;
    views: number;
    timestamp: string;
    posted_at: string;
};

export default function VideoCard({ selectVideo, videoId, thumbnail, title, channelName, posted_at, timestamp, views }: VideoCardProps) {

    function onClick() {
        selectVideo(videoId);
    }

    const formatViews = (): string => {
        if (views >= 1000000000) {
            return (views / 1000000000).toFixed(1) + 'B';
        } else if (views >= 1000000) {
            return (views / 1000000).toFixed(1) + 'M';
        } else if (views >= 1000) {
            return (views / 1000).toFixed(1) + 'K';
        } else {
            return views.toString();
        }
    }

    return (
        <div onClick={onClick} className="w-full flex flex-col cursor-pointer dark:hover:bg-gray-800 hover:bg-gray-100 p-2 rounded-lg duration-300 active:scale-105">
            <div className="aspect-video w-full relative">
                <img alt="profile_image" className="w-full rounded-md" src={thumbnail} />
                <div className="absolute right-1 bottom-1  bg-black/80 text-xs px-2 py-1 text-gray-50">{timestamp}</div>
            </div>
            <div className="dark:text-gray-300 text-gray-900 text-sm font-medium py-2 text-start">{title}</div>
            <div className="w-full flex items-center flex-wrap">
                <div className="dark:text-gray-400 text-gray-600 text-xs text-start">{channelName}</div>
                <div className="dark:text-gray-400 text-gray-600 text-xs text-start mx-2">{formatViews()}</div>
                <div className="dark:text-gray-400 text-gray-600 text-xs text-start">{posted_at}</div>
            </div>
        </div>
    )

}