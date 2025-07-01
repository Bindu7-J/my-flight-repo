// backend/migrations/booking_add_status.js
import mongoose from "mongoose";
import Booking from "../models/bookingSchema.js";

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/airplane";

async function migrate() {
  await mongoose.connect(MONGO_URI);
  const result = await Booking.updateMany(
    { status: { $exists: false } },
    { $set: { status: "active" } }
  );
  console.log(`Updated ${result.nModified || result.modifiedCount || 0} bookings`);
  await mongoose.disconnect();
}

migrate().catch(err => {
  console.error("Migration failed:", err);
  process.exit(1);
});
