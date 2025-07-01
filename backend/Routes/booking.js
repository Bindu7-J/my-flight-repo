// backend/Routes/booking.js
import express from "express";
import { getCheckoutSession, cancelBooking } from "../controller/bookingController.js";
import authenticate from "../middleware/authenticate.js";

const router = express.Router();

router.post("/checkout-session/:flightId", authenticate, getCheckoutSession);
router.patch("/cancel/:bookingId", authenticate, cancelBooking);

// ...other routes...

export default router;
