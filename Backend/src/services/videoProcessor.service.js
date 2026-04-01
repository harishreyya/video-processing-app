import fs from "fs";
import path from "path";
import { processVideo } from "./ffmpeg.service.js";
import { analyzeVideo } from "./sensitivity.service.js";
import { uploadToCloudinary } from "./cloudinary.service.js";
import Video from "../models/video.model.js";
import { io } from "../../server.js";

export const processVideoPipeline = async (videoId, filePath) => {
  try {
    console.log("Starting processing pipeline...");

    const video = await Video.findById(videoId);
    if (!video) return;

    video.status = "processing";
    await video.save();

    io.emit("video-progress", {
      videoId,
      status: "processing",
      progress: 10,
    });

    const outputDir = "processed";

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.resolve(
      outputDir,
      `processed-${Date.now()}.mp4`
    );

    if (!fs.existsSync(filePath)) {
      throw new Error("Input file not found");
    }

    await processVideo(filePath, outputPath);

     io.emit("video-progress", {
      videoId,
      status: "processing",
      progress: 60,
    });
    

    const result = await analyzeVideo(outputPath);

     io.emit("video-progress", {
      videoId,
      status: "processing",
      progress: 80,
    });


    const processedUpload = await uploadToCloudinary(outputPath);

    video.status = "done";
    video.sensitivity = result;
    video.processedUrl = processedUpload.secure_url;

    const processedStats = fs.statSync(outputPath);
    const processedSize = processedStats.size;
    video.size = processedSize; 
    await video.save();

    io.emit("video-progress", {
      videoId,
      status: "done",
      progress: 100,
    });

    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);

    console.log("Processing complete:", result);

  } catch (error) {
    console.error("Processing error:", error);
  }
};