import cloudinary from "../config/cloudinary.js";
import path from "path";

export const uploadToCloudinary = async (filePath) => {
  const normalizedPath = path.resolve(filePath);

  const result = await cloudinary.uploader.upload(normalizedPath, {
    resource_type: "video",
  });

  return result;
};