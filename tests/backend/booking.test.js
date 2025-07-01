import request from 'supertest';
import app from '../index.js'; // Adjust path as needed
import Booking from '../models/bookingSchema.js';
import User from '../models/userSchema.js';
import mongoose from 'mongoose';

describe('Booking Cancellation API', () => {
  let token, bookingId, userId;

  beforeAll(async () => {
    // Setup: create user, booking, get token (mock or real)
    // ... (mock user and booking creation)
  });

  afterAll(async () => {
    // Cleanup
    await mongoose.connection.close();
  });

  it('should cancel a booking for the owner', async () => {
    const res = await request(app)
      .patch(`/api/v1/bookings/${bookingId}/cancel`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    const booking = await Booking.findById(bookingId);
    expect(booking.status).toBe('cancelled');
  });

  it('should not allow non-owner to cancel', async () => {
    // Use another user's token
    const res = await request(app)
      .patch(`/api/v1/bookings/${bookingId}/cancel`)
      .set('Authorization', `Bearer fakeToken`);
    expect(res.statusCode).toBe(403);
  });

  it('should not cancel already cancelled booking', async () => {
    // Cancel again
    const res = await request(app)
      .patch(`/api/v1/bookings/${bookingId}/cancel`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(400);
  });
});
