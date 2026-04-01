import Video from "../models/video.model.js";
import axios from "axios";

export const streamVideo = async (req, res) => {
  try {
    const videoId = req.params.id;

    const video = await Video.findById(videoId);

    if (!video || !video.processedUrl) {
      return res.status(404).json({ message: "Video not found" });
    }

    const videoUrl = video.processedUrl;

    const range = req.headers.range;

    if (!range) {
      return res.status(400).send("Requires Range header");
    }

    const response = await axios({
      method: "GET",
      url: videoUrl,
      responseType: "stream",
      headers: {
        Range: range,
      },
    });

    res.writeHead(206, {
      "Content-Range": response.headers["content-range"],
      "Accept-Ranges": "bytes",
      "Content-Length": response.headers["content-length"],
      "Content-Type": "video/mp4",
    });

    response.data.pipe(res);

  } catch (error) {
    console.error("Streaming error:", error);
    res.status(500).send("Streaming failed");
  }
};