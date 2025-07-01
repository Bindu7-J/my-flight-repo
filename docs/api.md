### PATCH /api/v1/booking/:bookingId/cancel

- Cancels an active booking (sets status to 'cancelled')
- Auth required
- Response:
  - 200: { success: true, message: "Booking cancelled", booking }
  - 400: { success: false, message: "Booking already cancelled" }
  - 403: { success: false, message: "Unauthorized" }
  - 404: { success: false, message: "Booking not found" }
