import mongoose from "mongoose"

const servicesSchema = new mongoose.Schema({
    serviceId: { 
        type: String, 
        unique: true, 
        required: true 
    },
    name: { 
        type: String, 
        required: true 
    },
    description: String,
    category: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category' 
    },
    price: { 
        type: Number, 
        required: true 
    },
    averageRating: { 
        type: Number, 
        default: 0 
    },

},{timestamps : true})

export  const Services = mongoose.model("Services", servicesSchema)
