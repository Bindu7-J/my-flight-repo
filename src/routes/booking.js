// Updated booking route with cancellation logic
const express = require('express');
const router = express.Router();

// Mock booking data
let bookings = [
  { id: 1, status: 'confirmed' },
  { id: 2, status: 'confirmed' }
];

router.post('/cancel/:id', (req, res) => {
  const bookingId = parseInt(req.params.id);
  const booking = bookings.find(b => b.id === bookingId);
  if (booking) {
    booking.status = 'cancelled';
    res.json({ message: 'Your booking has been cancelled.' });
  } else {
    res.status(404).json({ message: 'Booking not found.' });
  }
});

module.exports = router;