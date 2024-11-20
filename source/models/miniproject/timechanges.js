import Time from '../miniproject/timeslot.model'; // Adjust the path if necessary
import moment from 'moment'; // For easier date manipulation

const resetTimeSlots = async () => {
    try {
     
        const currentTime = moment();
        const timeRecords = await Time.find();

        for (let timeRecord of timeRecords) {
            // Check if 24 hours have passed since the creation of the record
            const createdAt = moment(timeRecord.createdAt);
            const hoursDifference = currentTime.diff(createdAt, 'hours');

            // If more than 24 hours have passed, reset the time slots
            if (hoursDifference >= 24) {
                // Reset all time slots to 0
                const timeSlots = ["2", "4", "6", "8", "10", "12", "14", "16", "18", "20", "22", "0"];
                timeSlots.forEach(slot => {
                    timeRecord[slot] = 0;
                });

                // Save the updated time record
                await timeRecord.save();
                console.log(`Time slots for client ${timeRecord.clientid} reset successfully.`);
            }
        }
    } catch (error) {
        console.error("Error resetting time slots:", error);
    }
};

// Run this function periodically (e.g., every hour or as needed)
setInterval(resetTimeSlots, 3600000); // Reset time slots every hour (3600000 ms)
