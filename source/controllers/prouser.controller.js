import Asynchandler from "../utils/Asynchandler.js";
import ApiError from "../utils/ApiError.js";
import ApiRespoance from "../utils/ApiResponse.js";
import Time from "../models/miniproject/timeslot.model.js";
import Prouser from "../models/miniproject/prouser.model.js";

// **Register a New Prouser**
export const registerProuser = Asynchandler(async (req, res) => {
    const { name, email, password, category, address,contactno } = req.body;


    // Check for missing fields
    if (!name || !email || !password || !category || !address) {
        throw new ApiError(400, "Please provide all required fields");
    }

    // Validate service type
    if (!["parlor", "saloon", "massage"].includes(category)) {
        throw new ApiError(400, "Invalid service type");
    }

    // Check if email already exists
    const existingEmail = await Prouser.findOne({ email });
    if (existingEmail) {
        throw new ApiError(400, "Email already exists");
    }

    // Create a new Prouser
    const prouser = await Prouser.create({
        name,
        email,
        password,
        category,
        address,
        contactno,
    });

    // Create the timeslot entry for the Prouser
    const timeslot = await Time.create({ clientid: prouser._id });

    // Fetch and return the created Prouser (excluding sensitive data)
    const finalProuser = await Prouser.findById(prouser._id).select("-password -RefreshToken");

    res.status(201).json(new ApiRespoance(201, finalProuser, "Prouser registered successfully"));
});

// **Login Prouser**
export const loginProuser = Asynchandler(async (req, res) => {
    const { email, password } = req.body;

    // Check for missing fields
    if (!email || !password) {
        throw new ApiError(400, "Please provide email and password");
    }

    // Check if the Prouser exists
    const prouser = await Prouser.findOne({ email });
    if (!prouser) {
        throw new ApiError(400, "Prouser not found");
    }

    // Validate password
    const isPasswordCorrect = await prouser.ispasswordcorrect(password);
    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid password");
    }

    // Generate a new JWT refresh token
    const refreshToken = prouser.getJwtToken();
    prouser.RefreshToken = refreshToken;
    await prouser.save();

    // Fetch and return the Prouser (excluding sensitive data)
    const finalProuser = await Prouser.findById(prouser._id).select("-password -RefreshToken");

    // Check if timeslot exists for the Prouser, if not create one
    const existingTimeslot = await Time.findOne({ clientid: finalProuser._id });
    if (!existingTimeslot) {
        await Time.create({ clientid: finalProuser._id });
    }

    res
        .status(200)
        .cookie("RefreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Use secure cookie in production
            maxAge: 1000 * 60 * 60 * 24, // 1 day
        })
        .json(new ApiRespoance(200, finalProuser, "Prouser logged in successfully"));
});

// **Fetch Prouser Information**
export const ProuserInfo = Asynchandler(async (req, res) => {
    const prouser = await Prouser.findById(req.user._id)
        .select("-password -RefreshToken");

    if (!prouser) {
        throw new ApiError(404, "Prouser not found");
    }

    res.status(200).json(new ApiRespoance(200, prouser, "Prouser information retrieved successfully"));
});

// **Logout Prouser**
export const logoutProuser = Asynchandler(async (req, res) => {
    const prouser = await Prouser.findById(req.user._id);
    
    if (!prouser) {
        throw new ApiError(404, "Prouser not found");
    }

    // Clear the refresh token
    prouser.RefreshToken = undefined;
    await prouser.save();

    res
        .status(200)
        .clearCookie("RefreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Use secure cookie in production
        })
        .json(new ApiRespoance(200, null, "Prouser logged out successfully"));
});

export const updateMultipleTimeslots = Asynchandler(async (req, res) => {
    const {timeslots } = req.body;
    const clientid=req.user._id;
    // Validate input
    if (!clientid || typeof timeslots !== "object" || Object.keys(timeslots).length === 0) {
      throw new ApiError(400, "Please provide clientid and a valid timeslots object");
    }
  
    // Validate timeslot keys
    const validTimeslots = ["2", "4", "6", "8", "10", "12", "14", "16", "18", "20", "22", "0"];
    const invalidKeys = Object.keys(timeslots).filter(key => !validTimeslots.includes(key));
    if (invalidKeys.length > 0) {
      throw new ApiError(400, `Invalid timeslots: ${invalidKeys.join(", ")}`);
    }
  
    // Prepare update object
    const updateData = {};
    for (const [key, value] of Object.entries(timeslots)) {
      if (typeof value !== "number") {
        throw new ApiError(400, `Invalid count for timeslot ${key}: must be a number`);
      }
      updateData[key] = value;
    }
  
    // Find the document and update timeslots
    const updatedTime = await Time.findOneAndUpdate(
      { clientid },
      { $set: updateData },
      { new: true }
    );
  
    if (!updatedTime) {
      throw new ApiError(404, "Timeslot document not found");
    }
  
    res.status(200).json({
      status: "success",
      data: updatedTime,
      message: "Timeslots updated successfully"
    });
  });