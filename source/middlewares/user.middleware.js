import Asynchandler from "../utils/Asynchandler.js"
import User from "../models/miniproject/user.models.js";
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";

const userauthverfication=Asynchandler(async (req,res,next)=>{
    try{

      const token= await req.cookies?.RefreshToken || req.headers("Authorization")?.replace("Bearer ","") ;

      if(!token){
        throw new ApiError(401,"You are not authorized to access this route")
      }
     
      const decode=await jwt.verify(token,process.env.JWT_SECRET);
     
      if(!decode){
        throw new ApiError(401,"token is not verifed");
      }
    
    const user = await User.findById(decode._id).select("-password -RefreshToken")

      if(!user){
        throw new ApiError(401,"user not found")
      }

      req.user=user;
      next();
    }
    catch{
        throw new ApiError(401,"user is not logged in");
    }
})

export default userauthverfication; 