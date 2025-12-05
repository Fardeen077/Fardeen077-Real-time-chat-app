import { Server } from "socket.io"
import http from "http"
import express from "express"

const app = express();
const server = http.createServer(app);

// user to store online users
const userSocketMap = {};

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ["GET", "POST"],
    }
})

const getReceiverSocketId = (userId) => userSocketMap[userId]

io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId) userSocketMap[userId] = socket.id;
    // io.emit() is used to send events to all the connected clinest
    io.emit("getOnlineUsers", Object.keys(userSocketMap));


    socket.on("disconnect", () => {
        console.log("A user disconnected", socket.id);

        const userIdToRemove = Object.keys(userSocketMap).find(key => userSocketMap[key] === socket.id);
        if (userIdToRemove) delete userSocketMap[userIdToRemove];

        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export {
    io,
    app,
    server,
    getReceiverSocketId
}


