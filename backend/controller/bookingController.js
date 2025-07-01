// ...existing imports and code

/**
 * Cancel a booking (soft delete by status)
 * Only the booking owner can cancel
 * @route PATCH /api/v1/bookings/:id/cancel
 * @access Private
 */
export const cancelBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const userId = req.userId;
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }
    // Only owner can cancel
    if (booking.user.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }
    if (booking.status === 'cancelled') {
      return res.status(400).json({ success: false, message: "Booking already cancelled" });
    }
    booking.status = 'cancelled';
    await booking.save();
    return res.status(200).json({ success: true, message: "Booking cancelled." });
  } catch (error) {
    console.error("Cancel booking error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
// ...rest of file