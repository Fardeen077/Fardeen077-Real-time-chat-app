import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors"
import connectDB from "./lib/db.js";
import { app, server } from "./lib/socket.js"
import dotenv from "dotenv"
import authRoutes from "./routers/auth.route.js";
import messageRoutes from "./routers/message.route.js"
import { errorHandler } from "./middlewares/error.middleware.js";

dotenv.config({ path: './.env' });


const PORT = process.env.PORT;

app.use(cors({
    origin: process.env.CLINET_URL,
    credentials: true,
}));

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use(errorHandler());

server.listen(PORT, () => {
    console.log(`⚙️ Server is running at port : ${PORT}`);
    connectDB();
});