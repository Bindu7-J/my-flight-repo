// Import required modules and schemas
import Booking from "../models/bookingSchema.js";
import User from "../models/userSchema.js";
import Flight from "../models/flightSchema.js";
import Stripe from "stripe";
import Airline from "../models/airlineSchema.js";
import Ticket from "../models/ticketSchema.js";

// ...existing getCheckoutSession and other logic...

// Cancel a booking by setting status to 'cancelled'
export const cancelBooking = async (req, res) => {
  try {
    const bookingId = req.params.bookingId;
    const userId = req.userId;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    // Only the user who made the booking can cancel it
    if (booking.user.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Unauthorized to cancel this booking" });
    }

    if (booking.status === 'cancelled') {
      return res.status(400).json({ success: false, message: "Booking already cancelled" });
    }

    booking.status = 'cancelled';
    await booking.save();

    return res.status(200).json({ success: true, message: "Booking cancelled successfully" });
  } catch (error) {
    console.error("Error cancelling booking:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
