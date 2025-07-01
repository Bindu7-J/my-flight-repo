// tests/backend/bookingController.test.js
import request from "supertest";
import app from "../../backend/index.js";
import Booking from "../../backend/models/bookingSchema.js";
import User from "../../backend/models/userSchema.js";
import jwt from "jsonwebtoken";

describe("Booking Cancellation", () => {
  let user, token, booking;

  beforeAll(async () => {
    user = await User.create({ name: "Test User", email: "test@test.com", password: "password123" });
    booking = await Booking.create({ user: user._id, passportSizePhoto: "photo.jpg", status: "active" });
    token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "testsecret");
  });

  afterAll(async () => {
    await Booking.deleteMany({});
    await User.deleteMany({});
  });

  it("should cancel an active booking", async () => {
    const res = await request(app)
      .patch(`/api/v1/booking/cancel/${booking._id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    const updated = await Booking.findById(booking._id);
    expect(updated.status).toBe("cancelled");
  });

  it("should not allow double cancellation", async () => {
    await Booking.findByIdAndUpdate(booking._id, { status: "cancelled" });
    const res = await request(app)
      .patch(`/api/v1/booking/cancel/${booking._id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(400);
  });
});
