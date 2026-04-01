import Video from "../models/video.model.js";
import { processVideoPipeline } from "../services/videoProcessor.service.js";

export const uploadVideo = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const video = await Video.create({
      filename: file.filename,
      size: file.size,
      userId: req.user.id,
      status: "uploaded", 
    });

    processVideoPipeline(video._id, file.path);

    return res.status(201).json(video);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getVideos = async (req, res) => {
  try {
    const { status } = req.query;

    let filter = {};

    if (req.user.role === "editor") {
      filter.userId = req.user.id;
    }

    if (status) {
      filter.status = status;
    }

    const videos = await Video.find(filter).sort({ createdAt: -1 });

    res.json(videos);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};