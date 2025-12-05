import express from "express"
import cookieParser from "cookie-parser";
import connectDB from "./lib/DB.js";
import cors from "cors"
import { app, server } from "./lib/socket.js"
import dotenv from "dotenv"
import authRoutes from "./routers/auth.route.js";
import messageRoutes from "./routers/message.route.js"

dotenv.config({ path: './src/.env' });

const PORT = process.env.PORT || 8100;

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/messages", messageRoutes);

server.listen(PORT, () => {
    console.log(`⚙️ Server is running at port : ${PORT}`);
    connectDB();
});