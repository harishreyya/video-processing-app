import express from "express";
import { login, register } from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/admin", protect, authorizeRoles("admin"), (req, res) => {
  res.json({ message: "Admin access granted" });
});

export default router;