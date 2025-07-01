import request from "supertest";
import app from "../index.js";
import Booking from "../models/bookingSchema.js";
import User from "../models/userSchema.js";
import mongoose from "mongoose";

describe("cancelBooking", () => {
  let user, token, booking;

  beforeAll(async () => {
    // Setup test user and booking
    user = new User({
      name: "Test User",
      email: "testuser@example.com",
      password: "password123",
    });
    await user.save();

    booking = new Booking({
      flight: new mongoose.Types.ObjectId(),
      user: user._id,
      seat: "12A",
      fName: "Test",
      lName: "User",
      dob: "1990-01-01",
      passportNumber: "A1234567",
      state: "TestState",
      phoneNumber: "1234567890",
      email: "testuser@example.com",
      passportSizePhoto: "photo.jpg",
      status: "active",
    });
    await booking.save();

    // Mock JWT token generation
    token = "mocked-jwt-token"; // Replace with actual JWT if using real auth
  });

  afterAll(async () => {
    await Booking.deleteMany({});
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  it("should cancel an active booking", async () => {
    const res = await request(app)
      .patch(`/api/v1/booking/${booking._id}/cancel`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toMatch(/cancelled/i);
  });

  it("should return already cancelled if booking is cancelled", async () => {
    booking.status = "cancelled";
    await booking.save();
    const res = await request(app)
      .patch(`/api/v1/booking/${booking._id}/cancel`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/already cancelled/i);
  });

  it("should not allow unauthorized user", async () => {
    const otherToken = "mocked-other-jwt-token";
    const res = await request(app)
      .patch(`/api/v1/booking/${booking._id}/cancel`)
      .set("Authorization", `Bearer ${otherToken}`);
    expect(res.statusCode).toBe(403);
  });

  it("should return 404 for non-existent booking", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app)
      .patch(`/api/v1/booking/${fakeId}/cancel`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(404);
  });
});
