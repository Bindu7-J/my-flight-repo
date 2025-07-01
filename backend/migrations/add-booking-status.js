/**
 * Migration script to add 'status' field to existing bookings.
 * Run this script once after deploying the new schema.
 */
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import Booking from "../models/bookingSchema.js";

const MONGODB_URI = process.env.MONGODB_URI;

async function migrate() {
  await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  const result = await Booking.updateMany(
    { status: { $exists: false } },
    { $set: { status: "active" } }
  );
  console.log(`Migration complete. Modified ${result.nModified} bookings.`);
  await mongoose.disconnect();
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
