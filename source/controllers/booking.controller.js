import Asynchandler from "../utils/Asynchandler.js";
import Booking from "../models/miniproject/booking.modles.js"
import ApiResponse from "../utils/ApiResponse.js";  // Import ApiResponse utility
import Time from "../models/miniproject/timeslot.model.js"; 


const orderreceived = Asynchandler(async (req, res) => {
    try {
        const _id = req.user._id;  // Get the authenticated user's ID from the request

        // Find bookings (orders) where the 'bookedfor' is the logged-in user's ID
        const orders = await Booking.find({ bookedfor: _id })
            .populate({
                path: 'bookedby',  // Populating the 'bookedby' field (assuming it's a reference to the user model)
                select: 'name email contactno address',  // Specify the fields to return from the 'bookedby' user model
            })
            .lean();  // Using .lean() for better performance if no Mongoose methods are needed

        // Check if no orders were found
        if (orders.length === 0) {
            return res.status(404).json(
                new ApiResponse(404, null, "No orders found for this user.")
            );
        }

        // Respond with the found orders using ApiResponse
        res.status(200).json(
            new ApiResponse(200, orders, "Orders retrieved successfully")
        );
    } catch (error) {
        console.error(error);
        res.status(500).json(
            new ApiResponse(500, null, "Internal server error. Could not fetch orders.")
        );
    }
});


const booking = Asynchandler(async (req, res) => {
    try {
        const userid = req.user._id;  // Get the authenticated user's ID from the request

        // Find all bookings made by the user and populate 'bookedby' and 'bookedfor' fields
        const bookings = await Booking.find({ bookedby: userid })
            .populate({
                path: 'bookedfor',  // Populating the 'bookedfor' field (reference to another user model)
                select: 'name email contactno address',  // Specify the fields to return from the 'bookedfor' user model
            })
            .lean();  // Using .lean() for better performance if no Mongoose methods are needed

        // If no bookings are found
        if (bookings.length === 0) {
            return res.status(404).json(
                new ApiResponse(404, null, "No bookings found for this user.")
            );
        }

        // Respond with the found bookings
        res.status(200).json(
            new ApiResponse(200, bookings, "Bookings retrieved successfully")
        );
    } catch (error) {
        console.error(error);
        res.status(500).json(
            new ApiResponse(500, null, "Internal server error. Could not fetch bookings.")
        );
    }
});


const placeorder = Asynchandler(async (req, res) => {
    const userid = req.user._id;  // Get the authenticated user's ID
    const { ownerid, time } = req.body;  // Get the owner (saloon, parlor, etc.) ID and time slot from the request body

    // Validate that the time and owner ID are provided
    if (!ownerid || !time) {
        return res.status(400).json(new ApiResponse(400, null, "Owner ID and time slot are required"));
    }

    // Validate the time slot format
    const validTimes = ["2", "4", "6", "8", "10", "12", "14", "16", "18", "20", "22", "0"];
    if (!validTimes.includes(time)) {
        return res.status(400).json(new ApiResponse(400, null, "Invalid time slot provided"));
    }

    try {
        // Find the service provider (e.g., salon, parlor) by ownerid
        const timeSlot = await Time.findOne({ clientid: ownerid });

        // If the time slot is not found
        if (!timeSlot) {
            return res.status(404).json(new ApiResponse(404, null, "Service provider not found"));
        }

        // Check if the requested time slot is available (greater than 0)
        if (timeSlot[time] <= 0) {
            return res.status(400).json(new ApiResponse(400, null, "The selected time slot is not available"));
        }

        // Reduce the available time slot by 1
        timeSlot[time] -= 1;

        // Save the updated time slot back to the database
        await timeSlot.save();

        // Create a new booking
        const booking = await Booking.create({
            bookedby: userid,
            bookedfor: ownerid,
            bookedtime: time,
            status: "pending",  // Booking status (you can change it based on your requirements)
        });

        // Return the booking confirmation
        res.status(201).json(
            new ApiResponse(201, booking, "Booking placed successfully")
        );
    } catch (error) {
        console.error(error);
        res.status(500).json(new ApiResponse(500, null, "Internal server error"));
    }
});

const deletedorder = Asynchandler(async (req, res) => {
    try {
        const { orderId } = req.body;  // Get the order ID from the request body
        const _id = req.user._id;  // Get the authenticated user's ID from the request

        // Find the booking by ID and populate 'bookedfor' to get the full details
        const booking = await Booking.findById(orderId)
            .populate('bookedfor')  // Populating 'bookedfor' to get the full service details
            .lean();  // Use .lean() for better performance when no mongoose instance methods are required
        
        // If the booking doesn't exist
        if (!booking) {
            return res.status(404).json(
                new ApiResponse(404, null, "Order not found.")
            );
        }

        
        // Get the time slot from the booking
        const timeSlot = booking.bookedtime;  // Assuming `bookedtime` field stores the time slot for the booking

        // Find the corresponding time record in the 'Time' collection
        const timeRecord = await Time.findOne({ clientid: booking.bookedfor._id });

        if (!timeRecord) {
            return res.status(404).json(
                new ApiResponse(404, null, "Time slot record not found.")
            );
        }

        // Debugging: log the timeRecord and the timeSlot
        

        // Check if the time slot exists in the record
        if (timeRecord[timeSlot] !== undefined) {
            

            // Increase the time slot count by 1 (freeing the slot)
            timeRecord[timeSlot] += 1;  // Increase the slot count (making it available again)

            // Save the updated time record
            await timeRecord.save();

            // Debugging: Confirm that the time slot has been updated
            
        } else {
            return res.status(404).json(
                new ApiResponse(404, null, "Invalid time slot.")
            );
        }

        // Delete the booking (cancel the order)
        await Booking.findByIdAndDelete(orderId);

        // Respond with success message
        res.status(200).json(
            new ApiResponse(200, null, "Order cancelled successfully and time slot freed.")
        );
    } catch (error) {
        console.error(error);
        res.status(500).json(
            new ApiResponse(500, null, "Internal server error. Could not cancel the order.")
        );
    }
});



export {orderreceived,booking,placeorder,deletedorder}
