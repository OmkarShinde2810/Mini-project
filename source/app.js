import express from "express"
import cookieParser from "cookie-parser"
const app=express();

app.use(express.json());



app.use(cookieParser());



import router from "./routes/all.route.js";

app.use('/user',router);



app.use((err,req,res,next)=>{
    const errorStatus=err.status || 500;
    const errorMessage=err.message || "Something went wrong";
    
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack
    })
})




export {app};