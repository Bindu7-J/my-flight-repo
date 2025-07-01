import request from 'supertest';
import app from '../../index.js'; // Express app
import Booking from '../../models/bookingSchema.js';
import User from '../../models/userSchema.js';
import mongoose from 'mongoose';

describe('Booking cancellation', () => {
  let user, booking, token;

  beforeAll(async () => {
    // Setup test user, booking, and auth token...
  });

  it('should cancel a booking', async () => {
    const res = await request(app)
      .patch(`/api/v1/booking/cancel/${booking._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    const updatedBooking = await Booking.findById(booking._id);
    expect(updatedBooking.status).toBe('cancelled');
  });

  // More tests: unauthorized, already cancelled, not found
});
