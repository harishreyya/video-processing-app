import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    filename: String,
    size: Number,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["uploaded", "processing", "done"],
      default: "uploaded",
    },
    sensitivity: {
     type: String,
     enum: ["safe", "flagged"],
     default: "safe",
    },
    processedUrl: {
  type: String,
},
  },
  { timestamps: true }
);

export default mongoose.model("Video", videoSchema);