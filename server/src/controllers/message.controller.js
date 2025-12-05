import cloudinary from "../lib/cloudinary.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { io, getReceiverSocketId } from "../lib/socket.js";
import { User } from '../models/user.model.js'
import { Message } from "../models/message.model.js"

const getUserForSidebar = asyncHandler(async (req, res) => {
    const logggedInUserId = req.user._id;
    const filteredUser = await User.find({ _id: { $ne: logggedInUserId } }).select("-password");

    return res.status(200).json(
        new ApiResponse(200, filteredUser, "Users fetched successfully")
    );
});

const sendMessage = asyncHandler(async (req, res) => {
    const { text, image } = req.body;
    const { id: receivedId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
        const uploadResponse = await cloudinary.uploader.upload(image);
        imageUrl = uploadResponse.secure_url;
    }

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
        io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    return res.status(201).json(
        new ApiResponse(201, newMessage, "Message sent successfully")
    );
});


const getMessages = asyncHandler(async (req, res) => {
    const { id: userToCartId } = req.params;
    const myId = req.user._id;

    const message = await Message.find({
        $or: [
            { senderId: myId, receivedId: userToCartId, },
            { senderId: userToCartId, receivedId: myId, }
        ]
    });
    return res.status(200).json(
        new ApiResponse(200, message, "Messages fetched successfully"))
});

export {
    getUserForSidebar,
    sendMessage,
    getMessages
}