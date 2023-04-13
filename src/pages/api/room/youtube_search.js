import axios from 'axios';
const YT_API_KEY = process.env.YT_API_KEY;

export default async function handler(req, res) {
    var { q } = req.query;
    const search_url = 'https://www.googleapis.com/youtube/v3/search?key='+YT_API_KEY+'&maxResults=10&type=video&part=snippet&q='+q;
    const videos = (await axios.get(search_url)).data.items;
    res.status(200).json({ status:"success", total_videos: 10, videos });
}
  