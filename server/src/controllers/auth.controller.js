import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { User } from "../models/user.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import cloudinary from "../lib/cloudinary.js"

const generateAccessTokenAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) throw new ApiError(404, "User not found");

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(400, "Error generating token")
    }
};

const registerUser = asyncHandler(async (req, res) => {
    console.log("Incoming data:", req.body);
    const { email, username, password } = req.body;

    // VALIDATION
    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
        return res.status(400)
            .json({
                message: "password must be at least 6 characters"
            });
    }
    const existsUser = await User.findOne({
        $or: [{ username }, { email }]
    });
    if (existsUser) {
        throw new ApiError(400, "User is already exists");
    };

    let avatarUrl = "https://cdn-icons-png.flaticon.com/512/847/847969.png";

    if (req.file) {
        const cloud = await cloudinary.uploader.upload(req.file.path, {
            folder: "avatars",
        });
        avatarUrl = cloud.secure_url;
    }
    const user = await User.create({
        username: username?.toLowerCase() || "",
        email: email?.toLowerCase() || "",
        password,
        avatar: avatarUrl,
    });

    const tokens = await generateAccessTokenAndRefreshToken(user._id);

    const createdUser = await User.findById(user._id).select("-password -refreshToken");
    if (!createdUser) {
        throw new ApiError(500, "Error creating user !!!");
    }
    return res.status(201).json(new ApiResponse(201, { user: createdUser, ...tokens }, "User created",));
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    if (!email && !username) {
        throw new ApiError(400, "Email and userusername are required");
    };
    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (!user) {
        throw new ApiError(404, "User is not found");
    };
    const isPasswordVali = await user.isPasswordCorrect(password)
    if (!isPasswordVali) {
        throw new ApiError(400, "Invalid password");
    };
    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id);

    const options = {
        httpOnly: true,
        secure: false,     // ONLY false in localhost
        sameSite: "none"    // strict breaks cross-origin cookies

        // secure: process.env.NODE_ENV === "production",
        // sameSite: "strict"
    }
    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, {
            user: await User.findById(user._id).select("-password -refreshToken"),
            accessToken,
            refreshToken
        }, "User logged successfully"));
});

const logoutUser = asyncHandler(async (req, res) => {
    // clear cookies
    await User.findByIdAndUpdate(req.user._id, {
        $unset: { refreshToken: 1 },
    });
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict"
    }
    return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out successfully"))
});

const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user._id;

        if (!profilePic) {
            return res.status(400).json({ message: "Profile pic is required" });
        }
        const uploadResponse = await cloudinary.uploader.upload(profileImage);
        const updateUser = await User.findByIdAndUpdate(userId, { profileImage: uploadResponse.secure_url }, { new: true });

        res.status(200).json(updateUser)
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("ERROR in checkAuth controller", error.message);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}
export {
    generateAccessTokenAndRefreshToken,
    registerUser,
    checkAuth,
    loginUser,
    updateProfile,
    logoutUser,
};
