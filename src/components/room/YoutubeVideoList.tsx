import VideoCard from "./VideoCard";

interface YoutubeVideoListProps {
    videos: YoutubeVideo[];
    onSelectVideo: (videoId: string) => void;
}

export default function YoutubeVideoList({ videos, onSelectVideo }: YoutubeVideoListProps) {
    return (
        <div className="w-full grid grid-cols-5 px-8">
            {videos.length == 0 && (<div>No video found</div>)}
            {
                videos.map((youtubeVideo, index) => {
                    return (
                        <VideoCard key={index} videoId={youtubeVideo.videoId} title={youtubeVideo.title} thumbnail={youtubeVideo.thumbnail} selectVideo={() => { onSelectVideo(youtubeVideo.videoId); }} channelName={youtubeVideo.author.name} posted_at={youtubeVideo.ago} views={youtubeVideo.views} timestamp={youtubeVideo.duration.timestamp} />
                    )
                })
            }
        </div>
    )
}