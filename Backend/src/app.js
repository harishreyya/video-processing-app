import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import videoRoutes from "./routes/video.routes.js";
import streamRoutes from "./routes/stream.routes.js";
import userRoutes from "./routes/user.routes.js";


const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/stream", streamRoutes);
app.use("/api/users", userRoutes);

export default app;