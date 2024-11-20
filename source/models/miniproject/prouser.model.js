import bcrypt from "bcrypt";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const prouserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
        },
        email: {
            type: String,
            unique: true,
            required: [true, "Email is required"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        contactno: {
            type: String,
            required: [true, "Contact number is required"],
        },
        address: {
            street: { type: String, required: [true, "Street is required"] },
            city: { type: String, required: [true, "City is required"] },
            state: { type: String, required: [true, "State is required"] },
            zipCode: { type: String, required: [true, "Zip code is required"] },
            country: { type: String, required: [true, "Country is required"] },
        },
        RefreshToken: {
            type: String,
        },
        category: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

// Hash the password before saving
prouserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Generate JWT token
prouserSchema.methods.getJwtToken = function () {
    return jwt.sign(
        { _id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES || "7d" }
    );
};

// Validate password
prouserSchema.methods.ispasswordcorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

export default mongoose.model("Prouser", prouserSchema);
