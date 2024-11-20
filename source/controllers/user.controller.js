import ApiError from "../utils/ApiError.js";
import User from "../models/miniproject/user.models.js"
import Asynchandler from "../utils/Asynchandler.js"

import ApiRespoance from "../utils/ApiResponse.js";

const userinfo = Asynchandler(async (req, res) => {
    const id = req.user._id; // Assuming user is authenticated and _id is available in req.user
    const user = await User.findById(id).select("-password -RefreshToken");
    if (!user) {
        throw new ApiError(400, "User not found");
    }
    res.status(200).json(new ApiRespoance(200, user, "User info retrieved"));
});

// Register a new user
const registerUser = Asynchandler(async (req, res) => {
    const { name, email, password, address, contactno } = req.body;

    // Check for missing fields
    if (!name || !email || !password) {
        throw new ApiError(400, "Please provide all required fields");
    }

    // Check if the email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
        throw new ApiError(400, "Email already exists");
    }

    try {
        // Create a new user
        const user = await User.create({ name, email, password, contactno, address });
        if (!user) {
            throw new ApiError(400, "User not created");
        }

        // Return user details excluding sensitive fields
        const finalUser = await User.findById(user._id).select("-password -RefreshToken");
        res.status(201).json(new ApiRespoance(201, finalUser, "User registered successfully"));
    } catch (error) {
        console.error("Registration Error: ", error); // Add logging for better debugging
        throw new ApiError(500, "Error in registering user");
    }
});

// Login user
const loginUser = Asynchandler(async (req, res) => {
    const { email, password } = req.body;

    // Check for missing fields
    if (!email || !password) {
        throw new ApiError(400, "Please provide email and password");
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(400, "User not found");
    }

    // Validate password
    const isPasswordCorrect = await user.isPasswordCorrect(password);
    
    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid password");
    }
   

    // Return user details excluding sensitive fields
    const finalUser = await User.findById(user._id).select("-password -RefreshToken");
    
    // Generate a new JWT refresh token
    const RefreshToken = user.getJwtToken(); // This is the access token, not a refresh token
    
    user.RefreshToken = RefreshToken; // Save it as a refresh token in the user's document
   
    await user.save();
    
    // Send refresh token in a secure cookie and user data in response
    res
        .status(200)
        .cookie("RefreshToken", RefreshToken, {
            httpOnly: true, // Secure flag for cookie
            maxAge: 1000 * 60 * 60 * 24, // 1 day
        })
        .json(new ApiRespoance(200, finalUser, "User logged in successfully"));
});

// Logout user
const logoutUser = Asynchandler(async (req, res) => {
    const user = await User.findById(req.user._id); 
    

    if (!user) {
        throw new ApiError(400, "User not found");
    }

    // Clear the refresh token
    user.RefreshToken = undefined;
    await user.save();

    // Clear the refresh token cookie
    res
        .status(200)
        .clearCookie("RefreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Use secure cookie in production
        })
        .json(new ApiRespoance(200, null, "User logged out successfully"));
});

export { userinfo, registerUser, loginUser, logoutUser };
