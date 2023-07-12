import { useEffect, useState } from "react";
import YoutubePlayer from "./YoutubePlayer";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

export default function VideoPlayer({ user, room, ws }){
    const [videos,setVideos] = useState([]);
    const [currentVideo,setCurrentVideo] = useState(null);
    const [search,setSearch] = useState("");

    useEffect(() => {
        console.log({ws})
        if(videos.length > 0){
          setCurrentVideo(null);
        }
    },[videos]);

    function searchYoutube(){
        if(search.length > 0){
            axios.get("/api/room/youtube_search?q="+search,{
                headers:{
                authorization: user.access_token
                }
            }).then(res => {
                if(res.data.status == "success"){
                    setVideos(res.data.videos);
                }
            }).catch(err => {
                console.log(err);
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
                    <input onKeyDown={(evt) => { if(evt.code==="Enter"){ searchYoutube(); }}} value={search} onChange={(evt) => setSearch(evt.target.value)} className="font-mono text-base font-medium bg-gray-100 flex-grow h-full rounded-lg px-4 py-2 focus-visible:outline-none" type="text" placeholder="Search..." />
                </div>
            </div>

            <div className="w-full flex-grow flex flex-col items-center overflow-auto my-4">
                <div className="w-11/12 flex flex-row flex-wrap my-2">
                    {
                        videos.map((v,index) => {
                            function selectVideo(){
                                setCurrentVideo('https://www.youtube.com/watch?v='+v.id.videoId);
                                setSearch("");
                                setVideos([]);
                            }

                            return (
                            <div key={index} onClick={selectVideo} className="w-1/5 my-4 flex flex-col items-center cursor-pointer hover:bg-gray-800 p-2 rounded-lg">
                                <img alt="profile_image" className="w-full" src={v.snippet.thumbnails.high.url} />
                                <div className="text-white text-sm font-bold py-2 text-ellipsis">{v.snippet.title}</div>
                            </div>
                            )
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