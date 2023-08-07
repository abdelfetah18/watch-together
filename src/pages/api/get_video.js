import ytdl from "ytdl-core";

export default async function handler(req, res) {
    let { video_url } = req.query;
    let data = await ytdl.getInfo(video_url);
    data = data.formats.filter(v => v.hasAudio && v.hasVideo);
    res.status(200).json({ status: 'success', video_url, data });
}
  