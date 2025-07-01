import express from "express";
import { authenticate, restrict } from "../auth/verifyToken.js";

import { getCheckoutSession, cancelBooking } from "../controller/bookingController.js";

const router = express.Router();

router.post("/checkout-session/:flightId", authenticate, getCheckoutSession);

// PATCH /api/v1/booking/cancel/:bookingId
router.patch("/cancel/:bookingId", authenticate, cancelBooking);

export default router;
