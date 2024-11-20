import mongoose from "mongoose";
import {DB_NAME} from   '../constants.js'

const connectDB = async () => {
    try {
        
        const conn = await mongoose.connect(`${process.env.MONGODB_URI}/backend_mini_project`)
         console.log("database is connected");
        
    } catch (error) {
        
        console.log(error)
         process.exit(1)
    }
}
export default connectDB;