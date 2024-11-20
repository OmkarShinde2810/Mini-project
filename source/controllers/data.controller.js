import Time from "../models/miniproject/timeslot.model.js";
import Asynchandler from "../utils/Asynchandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const parlorinfo = Asynchandler(async (req, res) => {
    const { time, city } = req.body;

    // Validate input
    if (!time || !city) {
        throw new ApiError(400, "Please provide both time and city");
    }

    // Ensure time is in valid format
    const validTimes = ["2", "4", "6", "8", "10", "12", "14", "16", "18", "20", "22", "0"];
    if (!validTimes.includes(time)) {
        throw new ApiError(400, "Invalid time slot provided");
    }

    // Find parlors in the given city with available slots at the specified time
    const parlors = await Time.find({ [time]: { $gt: 0 } })
        .populate({
            path: "clientid",
            match: { "address.city": city },
            select: "name address contactno category", // Fields to return
        })
        .lean();

    // Filter out entries where no matching parlor was found
    const availableParlors = parlors.filter(parlor => parlor.clientid);

    if (availableParlors.length === 0) {
        throw new ApiError(404, "No parlors found for the given time and city");
    }

    res.status(200).json(
        new ApiResponse(200, availableParlors, "Parlor information retrieved successfully")
    );
});



export  {parlorinfo};
