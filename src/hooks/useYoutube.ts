import { useState } from "react";
import useAxios from "./useAxios";

export default function useYoutube() {
    const axios = useAxios();
    const [videos, setVideos] = useState([]);
    const [videoUrl, setVideoUrl] = useState('');

    const getVideoUrl = async (video_url: string): Promise<string> => {
        let response = await axios.get<HttpResponseData<{ url: string; }[]>>(`/api/get_video?video_url=${video_url}`);
        if (response.status == "success") {
            setVideoUrl(response.data[0].url);
            return response.data[0].url;
        }

        return '';
    }

    const search = async (query: string): Promise<boolean> => {
        let response = await axios.get<HttpResponseData<{ is_official_api: boolean; videos: any[] }>>(`/api/room/youtube_search?q=${query}`);
        if (response.status == "success") {
            setVideos(response.data.videos);
            return response.data.is_official_api;
        }

        return false;
    }

    return {
        videos,
        setVideos,
        videoUrl,
        getVideoUrl,
        search
    };
}