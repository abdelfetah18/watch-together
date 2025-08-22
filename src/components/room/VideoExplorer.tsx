import { useContext, useEffect, useState } from "react";
import { FaExclamationTriangle, FaSearch } from "react-icons/fa";

import RoomContext from "@/contexts/RoomContext";
import UserSessionContext from "@/contexts/UserSessionContext";
import useYoutube from "@/hooks/useYoutube";
import VideoPlayer from "./VideoPlayer";
import VideoCard from "./VideoCard";
import LoadingContext from "@/contexts/LoadingContext";

const FREE_API_ALERT_MESSAGE = "I am using the youtube free search API\n" +
    "and it has a limited requests. so instead\n" +
    "copy the url from YOUTUBE directly.\n" +
    "\nNOTE: Some videos may not work because of youtube policy stuffs.";

// NOTE: This is not a paid advertising, its just some channels
//       to learng more about programming and cyber security.
const randomSearchQueries = ["andreas kling", "liveoverflow", "fireship", "cs50", "Philipp Lackner", "Net Ninja", "Coding With Lewis", "Jacob Sorber"];

export default function VideoExplorer() {
    const loadingManager = useContext(LoadingContext);
    const userSession = useContext(UserSessionContext);
    const youtube = useYoutube();

    const { room } = useContext(RoomContext);
    const [search, setSearch] = useState(randomSearchQueries[Math.floor(Math.random() * (randomSearchQueries.length - 1))]);
    const [videoUrl, setVideoUrl] = useState('');
    const [videoId, setVideoId] = useState('');

    // NOTE: This message is to indicate that the official youtube API has exceed its limit.
    const [alertMessage, setAlertMessage] = useState("");

    useEffect(() => {
        searchYoutube();
    }, []);

    useEffect(() => {
        if (videoUrl.length > 0) {
            setSearch('');
            youtube.setVideos([]);
        }
    }, [videoUrl]);

    useEffect(() => {
        if (youtube.videos.length > 0) {
            setVideoUrl('');
        }
    }, [youtube.videos]);

    function isYoutubeUrl() {
        if (search.match(/^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.be)/g)) {
            let url = new URL(search);
            let videoId = url.searchParams.get("v");
            if (videoId) {
                return true;
            }
        }
        return false;
    }

    function searchYoutube() {
        if (search.length > 0) {
            youtube.setVideos([]);
            setAlertMessage("");
            if (isYoutubeUrl()) {
                loadingManager.show();
                youtube.getVideoUrl(search).then(url => {
                    loadingManager.hide();
                    setVideoUrl(url);
                    setSearch("");
                });
                return;
            }
            loadingManager.show();
            youtube.search(search).then(isOfficialApi => {
                loadingManager.hide();
                if (!isOfficialApi) {
                    setAlertMessage("Some videos may not work because the official API has exceed its limit.");
                }
            }).catch(err => {
                loadingManager.hide();
                setAlertMessage("Since this is a free hosting there is some rate limit on the search functionality.");
                console.log({ err });
                alert(FREE_API_ALERT_MESSAGE);
            });
        }
    }

    return (
        <div className="w-3/4 h-full flex flex-col items-center dark:bg-dark-gray bg-light-gray overflow-auto">
            <div className="w-full flex flex-row items-center py-4">
                <a href={"/profile"}>
                    <div className="ml-4 text-white font-bold text-xl cursor-pointer"><img className="h-12" src="/logo.png" /></div>
                </a>
                <div className="mx-4 flex-grow border dark:border-none dark:bg-dark-gray-bg rounded-full flex flex-row items-center flex-wrap cursor-pointer text-gray-900">
                    <div className="text-gray-300 px-4"><FaSearch /></div>
                    <input onKeyDown={(evt) => { if (evt.code === "Enter") { searchYoutube(); } }} value={search} onChange={(evt) => setSearch(evt.target.value)} className="bg-transparent flex-grow h-full py-3 focus-visible:outline-none placeholder:text-gray-400 dark:placeholder:text-gray-400 dark:text-gray-50" type="text" placeholder="Search or Paste a YOUTUBE URL and hit Enter" />
                </div>
            </div>

            <div className="w-full flex-grow flex flex-col items-center py-4">
                {
                    alertMessage && <div className="w-11/12 flex items-center dark:bg-dark-gray-bg border dark:border-none px-8 py-4 rounded-md text-orange-600 mb-6"><FaExclamationTriangle className="mr-2" />{alertMessage}</div>
                }

                <div className="w-11/12 flex flex-row flex-wrap my-2">
                    {
                        youtube.videos.map((v, index) => {
                            function selectVideo(videoId: string) {
                                loadingManager.show();
                                setSearch("");
                                setVideoId(videoId);
                                youtube.setVideos([]);
                                loadingManager.hide();
                                // youtube.getVideoUrl(`https://www.youtube.com/watch?v=${videoId}`).then(url => {
                                //     loadingManager.hide();
                                //     setVideoUrl(url);
                                //     setSearch("");
                                //     youtube.setVideos([]);
                                //     setAlertMessage("");
                                // });
                            }

                            return <VideoCardHandler key={index} selectVideo={selectVideo} video={v} />
                        })
                    }
                </div>

                <div className={"w-full h-5/6 " + (search.length > 0 ? "hidden" : "")}>
                    {
                        videoId && (
                            <VideoPlayer videoId={videoId} isAdmin={(room.admin as User)._id == userSession.user_id} />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

const VideoCardHandler = ({ video, selectVideo }) => {
    if (video.is_official_api) {
        return <VideoCard videoId={video.id.videoId} title={video.snippet.title} thumbnail={video.snippet.thumbnails.high.url} selectVideo={selectVideo} channelName="" posted_at="" timestamp="" views={0} />
    } else {
        return <VideoCard videoId={video.videoId} title={video.title} thumbnail={video.thumbnail} selectVideo={selectVideo} channelName={video.author.name} posted_at={video.ago} views={video.views} timestamp={video.duration.timestamp} />
    }
}

