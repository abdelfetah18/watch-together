import { useEffect, useState } from "react";
import YoutubePlayer from "./YoutubePlayer";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import Loading from "../Loading";

const FREE_API_ALERT_MESSAGE =  "I am using the youtube free search API\n"+
                                "and it has a limited requests. so instead\n"+
                                "copy the url from YOUTUBE directly.\n"+
                                "\nNOTE: Some videos may not work because of youtube policy stuffs.";

export default function VideoPlayer({ user, room, ws }){
    const [videos,setVideos] = useState([]);
    const [currentVideo,setCurrentVideo] = useState(null);
    const [search,setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    // NOTE: This message is to indicate that the official youtube API has exceed its limit.
    const [alertMessage, setAlertMessage] = useState("");

    useEffect(() => {
        console.log({ws})
        if(videos.length > 0){
          setCurrentVideo(null);
        }
    },[videos]);

    function isYoutubeUrl(){
        if(search.match(/^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.be)/g)){
            let url = new URL(search);
            let videoId = url.searchParams.get("v");
            if(videoId){
                return true;
            }
        }
        return false;
    }

    function searchYoutube(){
        if(search.length > 0){
            setVideos([]);
            setAlertMessage("");
            setIsLoading(true);
            if(isYoutubeUrl()){
                setCurrentVideo(search);
                setSearch("");
                setIsLoading(false);
                return;
            }
            axios.get("/api/room/youtube_search?q="+search,{ headers:{ authorization: user.access_token } }).then(res => {
                if(res.data.status == "success"){
                    setVideos(res.data.videos);
                    if(!res.data.is_official_api){
                        setAlertMessage("Some videos may not work because the official API has exceed its limit.");
                    }
                    setIsLoading(false);
                }
            }).catch(err => {
                console.log(err);
                alert(FREE_API_ALERT_MESSAGE);
            });
        }
    }

    return(
        <div className="w-3/4 h-full flex flex-col items-center bg-gray-900 py-4">
            <div className="w-full flex flex-row items-center">
                <a href={"/profile"}>
                    <div className="mx-4 text-white font-bold text-xl cursor-pointer">Watch-Together</div>
                </a>
                <div className="mx-4 flex-grow bg-gray-100 rounded-lg flex flex-row items-center flex-wrap cursor-pointer">
                    <FaSearch className="text-base w-1/12 text-gray-400" />
                    <input onKeyDown={(evt) => { if(evt.code==="Enter"){ searchYoutube(); }}} value={search} onChange={(evt) => setSearch(evt.target.value)} className="font-mono text-base font-medium bg-gray-100 flex-grow h-full rounded-lg px-4 py-2 focus-visible:outline-none" type="text" placeholder="Search or Paste a YOUTUBE URL and hit Enter" />
                </div>
            </div>

            <div className="w-full flex-grow flex flex-col items-center overflow-auto my-4">
                {
                    isLoading && <Loading />
                }
                
                {
                    alertMessage && <div className="w-11/12 bg-sky-950 px-8 py-2 rounded-md font-semibold text-red-500">{alertMessage}</div>
                }

                <div className="w-11/12 flex flex-row flex-wrap my-2">
                    {
                        videos.map((v,index) => {
                            function selectVideo(videoId){
                                setCurrentVideo('https://www.youtube.com/watch?v='+videoId);
                                setSearch("");
                                setVideos([]);
                                setAlertMessage("");
                            }
                            
                            return <VideoCardHandler key={index} selectVideo={selectVideo} video={v} />
                        })
                    }
                </div>

                <div className={"w-full h-5/6 bg-sky-900 "+(search.length > 0 ? "hidden" : "")}>
                    <YoutubePlayer selectedVideo={currentVideo} ws={ws} is_admin={room.admin._id === user._id} />
                </div>
            </div>
        </div>
    )
}

const VideoCardHandler = ({ video, selectVideo }) => {
    if(video.is_official_api){
        return <VideoCard videoId={video.id.videoId} title={video.snippet.title} thumbnail={video.snippet.thumbnails.high.url} selectVideo={selectVideo} />
    }else{
        return <VideoCard videoId={video.videoId} title={video.title} thumbnail={video.thumbnail} selectVideo={selectVideo} />
    }
}

const VideoCard = ({ selectVideo, videoId, thumbnail, title }) => {
    
    function onClick(){
        selectVideo(videoId);
    }

    return (
        <div onClick={onClick} className="w-1/4 my-4 flex flex-col items-center cursor-pointer hover:bg-gray-800 p-2 rounded-lg">
            <img alt="profile_image" className="w-full rounded-md" src={thumbnail} />
            <div className="text-gray-300 text-sm font-medium py-2 text-start">{title}</div>
        </div>
    )

}