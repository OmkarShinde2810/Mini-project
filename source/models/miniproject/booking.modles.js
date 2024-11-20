import bcrypt from "bcrypt";
import mongoose from "mongoose";
import jwt from "jsonwebtoken"

const bookingschema = new mongoose.Schema({
    bookedby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    bookedfor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Prouser",
        required:true
    },
    bookedtime:{
        type:String,
        required:true
    }

},
{
    timestamps:true
})

export default mongoose.model("Booking",bookingschema)