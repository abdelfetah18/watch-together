interface VideoCardProps {
    selectVideo: (videoId: string) => void;
    videoId: string;
    thumbnail: string;
    title: string;
};

export default function VideoCard({ selectVideo, videoId, thumbnail, title }: VideoCardProps) {

    function onClick() {
        selectVideo(videoId);
    }

    return (
        <div onClick={onClick} className="w-1/4 mb-2 flex flex-col items-center cursor-pointer dark:hover:bg-gray-800 hover:bg-indigo-100 p-2 rounded-lg">
            <img alt="profile_image" className="w-full rounded-md" src={thumbnail} />
            <div className="dark:text-gray-300 text-indigo-600 text-sm font-medium py-2 text-start">{title}</div>
        </div>
    )

}