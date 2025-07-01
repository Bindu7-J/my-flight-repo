// backend/models/bookingSchema.js
import mongoose from "mongoose";

const { Schema } = mongoose;

const bookingSchema = new Schema({
  // ...other fields...
  passportSizePhoto: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'cancelled'],
    default: 'active',
    required: true,
  },
});

export default mongoose.model("Booking", bookingSchema);
