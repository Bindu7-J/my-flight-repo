import express from "express";
import { authenticate, restrict } from "../auth/verifyToken.js";

import { getCheckoutSession, cancelBooking } from "../controller/bookingController.js";

const router = express.Router();

router.post("/checkout-session/:flightId", authenticate, getCheckoutSession);

// PATCH /cancel/:bookingId -- cancel a booking
router.patch("/cancel/:bookingId", authenticate, cancelBooking);

export default router;
