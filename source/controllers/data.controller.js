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
            path: "clientid",  // Refers to the 'clientid' in the Time model, which is a reference to the "Prouser" model
            match: { 
                "address.city": city,
                category: "parlor"  // Filter by category to return only parlors
            },
            select: "name address contactno category",  // Return only specific fields from the 'Prouser' model
        })
        .lean();

    // Filter out entries where no matching parlor was found
    const availableParlors = parlors.filter(parlor => parlor.clientid);

    if (availableParlors.length === 0) {
        throw new ApiError(404, "No parlor found for the given time and city");
    }

    res.status(200).json(
        new ApiResponse(200, availableParlors, "Parlor information retrieved successfully")
    );
});


const salooninfo = Asynchandler(async (req, res) => {
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

    // Find salons in the given city with available slots at the specified time
    const saloons = await Time.find({ [time]: { $gt: 0 } })
        .populate({
            path: "clientid",  // Refers to the 'clientid' in the Time model, which is a reference to the "Prouser" model
            match: { 
                "address.city": city,
                category: "salon"  // Filter by category to return only salons
            },
            select: "name address contactno category",  // Return only specific fields from the 'Prouser' model
        })
        .lean();

    // Filter out entries where no matching salon was found
    const availableSaloons = saloons.filter(saloon => saloon.clientid);

    if (availableSaloons.length === 0) {
        throw new ApiError(404, "No salon found for the given time and city");
    }

    res.status(200).json(
        new ApiResponse(200, availableSaloons, "Salon information retrieved successfully")
    );
});


const massageinfo = Asynchandler(async (req, res) => {
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

    // Find massage centers in the given city with available slots at the specified time
    const massages = await Time.find({ [time]: { $gt: 0 } })
        .populate({
            path: "clientid",  // Refers to the 'clientid' in the Time model, which is a reference to the "Prouser" model
            match: { 
                "address.city": city,
                category: "massage"  // Filter by category to return only massage centers
            },
            select: "name address contactno category",  // Return only specific fields from the 'Prouser' model
        })
        .lean();

    // Filter out entries where no matching massage center was found
    const availableMassages = massages.filter(massage => massage.clientid);

    if (availableMassages.length === 0) {
        throw new ApiError(404, "No massage center found for the given time and city");
    }

    res.status(200).json(
        new ApiResponse(200, availableMassages, "Massage center information retrieved successfully")
    );
});


const plumberinfo = Asynchandler(async (req, res) => {
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

    // Find plumbers in the given city with available slots at the specified time
    const plumbers = await Time.find({ [time]: { $gt: 0 } })
        .populate({
            path: "clientid",  // Refers to the 'clientid' in the Time model, which is a reference to the "Prouser" model
            match: { 
                "address.city": city,
                category: "plumber"  // Filter by category to return only plumbers
            },
            select: "name address contactno category",  // Return only specific fields from the 'Prouser' model
        })
        .lean();

    // Filter out entries where no matching plumber was found
    const availablePlumbers = plumbers.filter(plumber => plumber.clientid);

    if (availablePlumbers.length === 0) {
        throw new ApiError(404, "No plumber found for the given time and city");
    }

    res.status(200).json(
        new ApiResponse(200, availablePlumbers, "Plumber information retrieved successfully")
    );
});


const electricianinfo = Asynchandler(async (req, res) => {
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

    // Find electricians in the given city with available slots at the specified time
    const electricians = await Time.find({ [time]: { $gt: 0 } })
        .populate({
            path: "clientid",  // Refers to the 'clientid' in the Time model, which is a reference to the "Prouser" model
            match: { 
                "address.city": city,
                category: "electrician"  // Filter by category to return only electricians
            },
            select: "name address contactno category",  // Return only specific fields from the 'Prouser' model
        })
        .lean();

    // Filter out entries where no matching electrician was found
    const availableElectricians = electricians.filter(electrician => electrician.clientid);

    if (availableElectricians.length === 0) {
        throw new ApiError(404, "No electrician found for the given time and city");
    }

    res.status(200).json(
        new ApiResponse(200, availableElectricians, "Electrician information retrieved successfully")
    );
});


const carpenterinfo = Asynchandler(async (req, res) => {
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

    // Find carpenters in the given city with available slots at the specified time
    const carpenters = await Time.find({ [time]: { $gt: 0 } })
        .populate({
            path: "clientid",  // Refers to the 'clientid' in the Time model, which is a reference to the "Prouser" model
            match: { 
                "address.city": city,
                category: "carpenter"  // Filter by category to return only carpenters
            },
            select: "name address contactno category",  // Return only specific fields from the 'Prouser' model
        })
        .lean();

    // Filter out entries where no matching carpenter was found
    const availableCarpenters = carpenters.filter(carpenter => carpenter.clientid);

    if (availableCarpenters.length === 0) {
        throw new ApiError(404, "No carpenter found for the given time and city");
    }

    res.status(200).json(
        new ApiResponse(200, availableCarpenters, "Carpenter information retrieved successfully")
    );
});




const painterinfo = Asynchandler(async (req, res) => {
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

    // Find painters in the given city with available slots at the specified time
    const painters = await Time.find({ [time]: { $gt: 0 } })
        .populate({
            path: "clientid",  // Refers to the 'clientid' in the Time model, which is a reference to the "Prouser" model
            match: { 
                "address.city": city,
                category: "painter"  // Filter by category to return only painters
            },
            select: "name address contactno category",  // Return only specific fields from the 'Prouser' model
        })
        .lean();

    // Filter out entries where no matching painter was found
    const availablePainters = painters.filter(painter => painter.clientid);

    if (availablePainters.length === 0) {
        throw new ApiError(404, "No painter found for the given time and city");
    }

    res.status(200).json(
        new ApiResponse(200, availablePainters, "Painter information retrieved successfully")
    );
});




const dermainfo = Asynchandler(async (req, res) => {
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

    // Find dermatologists in the given city with available slots at the specified time
    const dermas = await Time.find({ [time]: { $gt: 0 } })
        .populate({
            path: "clientid",  // Refers to the 'clientid' in the Time model, which is a reference to the "Prouser" model
            match: { 
                "address.city": city,
                category: "derma"  // Filter by category to return only dermatologists
            },
            select: "name address contactno category",  // Return only specific fields from the 'Prouser' model
        })
        .lean();

    // Filter out entries where no matching dermatologist was found
    const availableDermas = dermas.filter(derma => derma.clientid);

    if (availableDermas.length === 0) {
        throw new ApiError(404, "No dermatologist found for the given time and city");
    }

    res.status(200).json(
        new ApiResponse(200, availableDermas, "Dermatologist information retrieved successfully")
    );
});




const cardiacinfo = Asynchandler(async (req, res) => {
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

    // Find cardiologists in the given city with available slots at the specified time
    const cardiacs = await Time.find({ [time]: { $gt: 0 } })
        .populate({
            path: "clientid",  // Refers to the 'clientid' in the Time model, which is a reference to the "Prouser" model
            match: { 
                "address.city": city,
                category: "cardiac"  // Filter by category to return only cardiologists
            },
            select: "name address contactno category",  // Return only specific fields from the 'Prouser' model
        })
        .lean();

    // Filter out entries where no matching cardiologist was found
    const availableCardiacs = cardiacs.filter(cardiac => cardiac.clientid);

    if (availableCardiacs.length === 0) {
        throw new ApiError(404, "No cardiologist found for the given time and city");
    }

    res.status(200).json(
        new ApiResponse(200, availableCardiacs, "Cardiologist information retrieved successfully")
    );
});




const diabetesinfo = Asynchandler(async (req, res) => {
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

    // Find diabetes specialists in the given city with available slots at the specified time
    const diabetesSpecialists = await Time.find({ [time]: { $gt: 0 } })
        .populate({
            path: "clientid",  // Refers to the 'clientid' in the Time model, which is a reference to the "Prouser" model
            match: { 
                "address.city": city,
                category: "diabetes"  // Filter by category to return only diabetes specialists
            },
            select: "name address contactno category",  // Return only specific fields from the 'Prouser' model
        })
        .lean();

    // Filter out entries where no matching diabetes specialist was found
    const availableDiabetesSpecialists = diabetesSpecialists.filter(specialist => specialist.clientid);

    if (availableDiabetesSpecialists.length === 0) {
        throw new ApiError(404, "No diabetes specialist found for the given time and city");
    }

    res.status(200).json(
        new ApiResponse(200, availableDiabetesSpecialists, "Diabetes specialist information retrieved successfully")
    );
});


export  {diabetesinfo,parlorinfo,salooninfo,massageinfo,plumberinfo,electricianinfo,carpenterinfo,painterinfo,dermainfo,cardiacinfo};
