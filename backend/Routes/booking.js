import express from "express";
import { authenticate, restrict } from "../auth/verifyToken.js";

import { getCheckoutSession, cancelBooking } from "../controller/bookingController.js";

const router = express.Router();

router.post("/checkout-session/:flightId", authenticate, getCheckoutSession);
router.patch("/:id/cancel", authenticate, cancelBooking);

export default router;
