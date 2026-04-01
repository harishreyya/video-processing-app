import express from "express";
import { getUsers } from "../controllers/user.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = express.Router();

router.get("/", protect, authorizeRoles("admin"), getUsers);

export default router;