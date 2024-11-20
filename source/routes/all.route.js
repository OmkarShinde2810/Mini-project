import { Router } from "express";
import userauthverfication from "../middlewares/user.middleware.js";
import { userinfo, registerUser ,loginUser,logoutUser} from "../controllers/user.controller.js";
import {registerProuser,loginProuser,logoutProuser,ProuserInfo,updateMultipleTimeslots} from "../controllers/prouser.controller.js";
import prouserauthverfication from "../middlewares/Prouser.middleware.js"
import  {diabetesinfo,parlorinfo,salooninfo,massageinfo,plumberinfo,electricianinfo,carpenterinfo,painterinfo,dermainfo,cardiacinfo} from "../controllers/data.controller.js"
import {orderreceived,booking,placeorder,deletedorder} from "../controllers/booking.controller.js"

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

router.route('/parlorinfo').post(userauthverfication, parlorinfo);

// Route for Saloon Info
router.route('/salooninfo').post(userauthverfication, salooninfo);

// Route for Massage Info
router.route('/massageinfo').post(userauthverfication, massageinfo);

// Route for Plumber Info
router.route('/plumberinfo').post(userauthverfication, plumberinfo);

// Route for Electrician Info
router.route('/electricianinfo').post(userauthverfication, electricianinfo);

// Route for Carpenter Info
router.route('/carpenterinfo').post(userauthverfication, carpenterinfo);

// Route for Painter Info
router.route('/painterinfo').post(userauthverfication, painterinfo);

// Route for Derma Info
router.route('/dermainfo').post(userauthverfication, dermainfo);

// Route for Cardiac Info
router.route('/cardiacinfo').post(userauthverfication, cardiacinfo);

// Route for Diabetes Info
router.route('/diabetesinfo').post(userauthverfication, diabetesinfo);



//booking

router.route('/orderreceived').post(prouserauthverfication, orderreceived);

router.route('/booking').post(userauthverfication, booking);

router.route('/placeorder').post(userauthverfication, placeorder);

router.route('/deletedorder').post(userauthverfication, deletedorder);

export default router;
