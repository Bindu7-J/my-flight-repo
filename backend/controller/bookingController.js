// backend/controller/bookingController.js
import Booking from "../models/bookingSchema.js";

// ...other controller functions...

// Cancel a booking
export const cancelBooking = async (req, res) => {
  try {
    const bookingId = req.params.bookingId;
    const userId = req.userId;
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }
    if (booking.user.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }
    if (booking.status !== 'active') {
      return res.status(400).json({ success: false, message: "Booking already cancelled or not active" });
    }
    booking.status = 'cancelled';
    await booking.save();
    return res.status(200).json({ success: true, message: "Booking cancelled." });
  } catch (error) {
    console.error("Cancel booking error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ...export other controllers...
