// backend/migrations/set_booking_status_active.js
import mongoose from "mongoose";
import Booking from "../models/bookingSchema.js";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/airplane_booking";

async function migrate() {
  await mongoose.connect(MONGODB_URI);
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
