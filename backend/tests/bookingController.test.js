import request from "supertest";
import app from "../index.js";
import Booking from "../models/bookingSchema.js";
import User from "../models/userSchema.js";
import mongoose from "mongoose";

describe("Booking Cancellation", () => {
  let user, booking, token, otherUser, otherToken;

  beforeAll(async () => {
    // Setup user, booking, and auth token (mock or real setup as per project)
    // ...mock user and booking creation...
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test("should cancel an active booking", async () => {
    const res = await request(app)
      .patch(`/api/v1/booking/${booking._id}/cancel`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.booking.status).toBe("cancelled");
  });

  test("should not cancel already cancelled booking", async () => {
    await Booking.findByIdAndUpdate(booking._id, { status: "cancelled" });
    const res = await request(app)
      .patch(`/api/v1/booking/${booking._id}/cancel`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  test("should not cancel booking for wrong user", async () => {
    // ...create another user/token...
    const res = await request(app)
      .patch(`/api/v1/booking/${booking._id}/cancel`)
      .set("Authorization", `Bearer ${otherToken}`);
    expect(res.status).toBe(403);
  });
});
