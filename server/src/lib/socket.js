import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const userToSocket = new Map();
const socketToUser = new Map();

const io = new Server(server, {
    cors: {
        origin: process.env.CLINET_URL,
        methods: ["GET", "POST"],
    },
});

const getReceiverSocketId = (userId) => userToSocket.get(userId);

io.on("connection", (socket) => {
    console.log("A user connenct", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId) {
        userToSocket.set(userId, socket.id);
        socketToUser.set(socket.id, userId);
    }
    io.emit("getOnlineUsers", Array.from(userToSocket.keys()));

    socket.on("disconnect", () => {
        console.log("A user disconnected", socket.id);

        const userId = socketToUser.get(socket.id);

        if (userId) {
            userToSocket.delete(userId);
            socketToUser.delete(socket.id);
        }
        io.emit("getOnlineUsers", Array.from(userToSocket.keys()));
    });
});

export {
    app,
    server,
    io,
    getReceiverSocketId,
};