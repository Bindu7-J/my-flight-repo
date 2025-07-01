// ... (existing imports and code)
import Booking from "../models/bookingSchema.js";

// ... (other controller functions)

// Cancel a booking by ID (soft delete: set status to 'cancelled')
export const cancelBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const userId = req.userId;

    // Find booking and ensure it belongs to the user
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }
    if (booking.user.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }
    if (booking.status === "cancelled") {
      return res.status(400).json({ success: false, message: "Booking already cancelled" });
    }

    booking.status = "cancelled";
    await booking.save();

    return res.status(200).json({ success: true, message: "Booking cancelled" });
  } catch (error) {
    console.error("Error cancelling booking:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ... (export and other code)
