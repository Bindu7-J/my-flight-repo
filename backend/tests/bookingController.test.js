import request from "supertest";
import app from "../index.js"; // Adjust if app is exported differently
import mongoose from "mongoose";
import Booking from "../models/bookingSchema.js";
import User from "../models/userSchema.js";
import jwt from "jsonwebtoken";

describe("Booking cancellation API", () => {
  let user, token, booking;

  beforeAll(async () => {
    // Connect to test DB
    await mongoose.connect(process.env.MONGODB_URI);

    // Create test user and booking
    user = new User({ email: "test@example.com", password: "test123" });
    await user.save();
    booking = new Booking({
      flight: new mongoose.Types.ObjectId(),
      user: user._id,
      seat: "1A",
      fName: "Test",
      lName: "User",
      dob: "2000-01-01",
      passportNumber: "P1234567",
      state: "CA",
      phoneNumber: "1234567890",
      email: "test@example.com",
      passportSizePhoto: "photo.jpg",
      status: "active",
    });
    await booking.save();

    // JWT token
    token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  });

  afterAll(async () => {
    await Booking.deleteMany({});
    await User.deleteMany({});
    await mongoose.disconnect();
  });

  it("should cancel a booking", async () => {
    const res = await request(app)
      .patch(`/api/v1/bookings/${booking._id}/cancel`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);

    const updated = await Booking.findById(booking._id);
    expect(updated.status).toBe("cancelled");
  });

  it("should not cancel a booking twice", async () => {
    await Booking.findByIdAndUpdate(booking._id, { status: "cancelled" });
    const res = await request(app)
      .patch(`/api/v1/bookings/${booking._id}/cancel`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(400);
  });

  it("should not allow unauthorized user", async () => {
    const otherToken = jwt.sign({ id: new mongoose.Types.ObjectId() }, process.env.JWT_SECRET);
    const res = await request(app)
      .patch(`/api/v1/bookings/${booking._id}/cancel`)
      .set("Authorization", `Bearer ${otherToken}`);
    expect(res.status).toBe(403);
  });
});
