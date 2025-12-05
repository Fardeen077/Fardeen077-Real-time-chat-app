import { protectRoute } from "../middlewares/auth.middleware.js";
import { Router } from "express";
import { getMessages, getUserForSidebar, sendMessage } from "../controllers/message.controller.js";

const router = Router();

router.post("/send/:id", protectRoute, sendMessage);
router.get("/users", protectRoute, getUserForSidebar);
router.get("/message/:id", protectRoute, getMessages);

export default router;