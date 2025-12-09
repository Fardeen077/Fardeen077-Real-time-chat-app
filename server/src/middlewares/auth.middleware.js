import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
    try {
        // Read token from cookies OR Authorization header
        const token =
            req.cookies?.accessToken ||
            req.header("Authorization")?.replace("Bearer ", "").trim();

        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No Token" });
        }

        // Verify Token
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decoded._id).select(
            "-password -refreshToken"
        );

        if (!user) {
            return res.status(401).json({ message: "Unauthorized - Invalid User" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("JWT ERROR =>", error.message);
        return res.status(401).json({ message: "Invalid Access Token" });
    }
};
