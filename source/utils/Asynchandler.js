

const Asynchandler =(request)=>{
    return (req,res,next)=>{
     Promise.resolve(request(req,res,next)).catch((error)=>next(error))
 }
 }


// const Asynchandler = (fun) => {
//    return async (req, res, next) => {
//         try {
//             await fun(req, res, next);
//         } catch (error) {
//             console.log("Error in the async handler");
//             throw new ApiError(100, error);
//         }
//     };
// };

export default Asynchandler