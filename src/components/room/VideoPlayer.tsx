import YoutubeVideoPlayer from "./YoutubeVIdeoPlayer";

interface VideoPlayerProps {
    videoId: string;
    isAdmin: boolean;
};

export default function VideoPlayer({ videoId, isAdmin }: VideoPlayerProps) {
    return (
        <div className="w-full h-full flex flex-col items-center bg-black relative">
            <YoutubeVideoPlayer videoId={videoId} isAdmin={isAdmin} />
        </div>
    )
}