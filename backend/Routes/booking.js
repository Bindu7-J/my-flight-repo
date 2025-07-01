// ...existing imports
import { getCheckoutSession, cancelBooking } from "../controller/bookingController.js";
// ...existing middleware imports

// ...existing routes
router.post("/checkout-session/:flightId", authenticate, getCheckoutSession);
// Add booking cancellation route
router.patch("/:id/cancel", authenticate, cancelBooking);
// ...rest of file