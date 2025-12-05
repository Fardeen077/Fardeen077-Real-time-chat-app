import { protectRoute } from "../middlewares/auth.middleware.js"
import { registerUser, checkAuth, loginUser, logoutUser, updateProfile } from "../controllers/auth.Controller.js";
import { Router } from "express";


const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", protectRoute, logoutUser);
router.put("/update-profile", protectRoute, updateProfile);
router.get("/check", protectRoute, checkAuth);

export default router;

