
import express from "express";
import {
  uploadVideo,
  getVideos
} from "../controllers/video.controller.js";

import upload from "../middlewares/upload.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = express.Router();


router.get("/", protect, authorizeRoles("viewer", "editor", "admin"), getVideos);

router.post(
  "/upload",
  protect,
  authorizeRoles("editor", "admin"),
  upload.single("video"),
  uploadVideo
);

export default router;