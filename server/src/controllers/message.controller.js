import cloudinary from "../lib/cloudinary.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { io, getReceiverSocketId } from "../lib/socket.js";
import { User } from '../models/user.model.js'
import { Message } from "../models/message.model.js"
import { ApiError } from "../utils/ApiError.js";

const getUserForSidebar = asyncHandler(async (req, res) => {
    const logggedInUserId = req.user?._id;
    if (!logggedInUserId) {
        throw new ApiError(401, "Unauthorized");
    }
    const filteredUser = await User.find({ _id: { $ne: logggedInUserId } }).select("-password");

    return res.status(200).json(
        new ApiResponse(200, filteredUser, "Users fetched successfully")
    );
});

const sendMessage = asyncHandler(async (req, res) => {
    const { text, image } = req.body;
    const { id: receivedId } = req.params;
    const senderId = req.user._id;

    if (!text && !image) {
        throw new ApiError(400, "Message cannot be empty")
    }

    if (senderId.toString() === receivedId) {
        throw new ApiError(400, "You cannot message yourself");
    }

    let imageUrl;
    if (image) {
        try {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        } catch (error) {
            throw new ApiError(500, "Image upload failed");
        }
    };

    const newMessage = new Message({
        senderId,
        receivedId,
        text,
        image: imageUrl,
    });
    await newMessage.save();
    // todo realtime functionality goes hete => socket.io
    const receiverSocketId = getReceiverSocketId(receivedId);

    if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", {
            message: newMessage,
            senderId,
        });
    }
    return res.status(201).json(
        new ApiResponse(201, newMessage, "Message sent successfully")
    );
});


const getMessages = asyncHandler(async (req, res) => {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const message = await Message.find({
        $or: [
            { senderId: myId, receivedId: userToChatId, },
            { senderId: userToChatId, receivedId: myId, }
        ]
    }).sort({ createdAt: 1 });
    return res.status(200).json(
        new ApiResponse(200, message, "Messages fetched successfully"))
});

export {
    getUserForSidebar,
    sendMessage,
    getMessages
}