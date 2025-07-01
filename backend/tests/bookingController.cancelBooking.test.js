import request from 'supertest';
import app from '../index.js'; // Your Express app
import mongoose from 'mongoose';
import Booking from '../models/bookingSchema.js';
import User from '../models/userSchema.js';
import jwt from 'jsonwebtoken';

describe('PATCH /api/v1/booking/cancel/:bookingId', () => {
  let user, booking, token;

  beforeAll(async () => {
    user = await User.create({ email: 'test@example.com', password: 'pass', name: 'Test User' });
    booking = await Booking.create({
      flight: new mongoose.Types.ObjectId(),
      user: user._id,
      seat: 'A1',
      fName: 'Test',
      lName: 'User',
      dob: '1990-01-01',
      passportNumber: '123456',
      state: 'TestState',
      phoneNumber: '1234567890',
      email: 'test@example.com',
      passportSizePhoto: 'url',
      status: 'active',
    });
    token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'testsecret');
  });

  afterAll(async () => {
    await Booking.deleteMany({});
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  it('should cancel an active booking', async () => {
    const res = await request(app)
      .patch(`/api/v1/booking/cancel/${booking._id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe('Booking cancelled');
    const updated = await Booking.findById(booking._id);
    expect(updated.status).toBe('cancelled');
  });

  it('should not cancel already cancelled booking', async () => {
    booking.status = 'cancelled';
    await booking.save();
    const res = await request(app)
      .patch(`/api/v1/booking/cancel/${booking._id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('should return 404 for non-existent booking', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app)
      .patch(`/api/v1/booking/cancel/${fakeId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(404);
  });

  it('should return 403 if user does not own booking', async () => {
    const otherUser = await User.create({ email: 'other@example.com', password: 'pass', name: 'Other User' });
    const otherToken = jwt.sign({ id: otherUser._id }, process.env.JWT_SECRET || 'testsecret');
    const res = await request(app)
      .patch(`/api/v1/booking/cancel/${booking._id}`)
      .set('Authorization', `Bearer ${otherToken}`);
    expect(res.statusCode).toBe(403);
  });
});
