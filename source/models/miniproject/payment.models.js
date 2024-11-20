import mongoose from "mongoose "

const paymentSchema = new mongoose.Schema({
    
    paymentId: { 
        type: String, 
        unique: true, 
        required: true
    },
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking', 
        required: true
    },
    amount: { 
        type: Number, 
        required: true 
    },
    paymentMethod: { 
        type: String, 
        enum: ['Credit Card', 'Debit Card', 'Wallet'], 
        required: true 
    },
    status: { 
        type: String, 
        enum: ['Pending', 'Completed', 'Failed'], 
        default: 'Pending' 
    },
    transactionId: String,

},{timestamps : true })

export const Patment = mongoose.model("Payment", paymentSchema)