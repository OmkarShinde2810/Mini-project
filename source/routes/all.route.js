import { Router } from "express";
import userauthverfication from "../middlewares/user.middleware.js";
import { userinfo, registerUser ,loginUser,logoutUser} from "../controllers/user.controller.js";
import {registerProuser,loginProuser,logoutProuser,ProuserInfo,updateMultipleTimeslots} from "../controllers/prouser.controller.js";
import prouserauthverfication from "../middlewares/Prouser.middleware.js"
import {parlorinfo} from "../controllers/data.controller.js"


const router = Router();


//user

router.route('/userinfo').post(userauthverfication, userinfo);

router.route('/register').post(registerUser);

router.route('/login').post(loginUser);

router.route('/logoutUser').post(userauthverfication, logoutUser);


//prouser

router.route('/registerprouser').post(registerProuser);

router.route('/loginprouser').post(loginProuser);

router.route('/logoutprouser').post(prouserauthverfication,logoutProuser);

router.route('/prouserinfo').post(prouserauthverfication,ProuserInfo);

router.route('/updatemultipletimeslots').post(prouserauthverfication,updateMultipleTimeslots);


// data for user

router.route('/parlorinfo').post(userauthverfication,parlorinfo);


export default router;
