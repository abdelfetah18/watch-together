import axios from 'axios';
import yts from 'yt-search';
const YT_API_KEY = process.env.YT_API_KEY;

export default async function handler(req, res) {
    let { q } = req.query;
    let videos = [];
    let is_official_api = true;

    try {
        const search_url = 'https://www.googleapis.com/youtube/v3/search?key=' + YT_API_KEY + '&maxResults=10&type=video&part=snippet&q=' + q;
        videos = (await axios.get(search_url)).data.items;
    } catch (err) {
        try {
            const r = await yts(q);
            videos = r.videos;
            is_official_api = false;
        } catch (e) {
            console.log("Something went wrong", { error: e });
            res.status(500).json({ status: "error", error: e });
        }
    }

    res.status(200).json({ status: "success", data: { is_official_api, total_videos: videos.length, videos } });
}
