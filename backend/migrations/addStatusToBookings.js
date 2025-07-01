import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGO_URL || "mongodb://localhost:27017/airplane_ticket_booking";
const Booking = mongoose.model(
  "Booking",
  new mongoose.Schema({}, { strict: false }),
  "bookings"
);

async function migrate() {
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  const result = await Booking.updateMany(
    { status: { $exists: false } },
    { $set: { status: "active" } }
  );
  console.log(`Migration complete. Modified: ${result.nModified} bookings.`);
  await mongoose.disconnect();
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
