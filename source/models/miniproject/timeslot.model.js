import mongoose from "mongoose";

const timeSchema = new mongoose.Schema(
    {
        clientid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Prouser", // Reference to the correct user model
            required: true,
        },
        "2": { type: Number, default: 0 },
        "4": { type: Number, default: 0 },
        "6": { type: Number, default: 0 },
        "8": { type: Number, default: 0 },
        "10": { type: Number, default: 0 },
        "12": { type: Number, default: 0 },
        "14": { type: Number, default: 0 },
        "16": { type: Number, default: 0 },
        "18": { type: Number, default: 0 },
        "20": { type: Number, default: 0 },
        "22": { type: Number, default: 0 },
        "0": { type: Number, default: 0 },
    },
    { timestamps: true }
);

export default mongoose.model("Time", timeSchema);
