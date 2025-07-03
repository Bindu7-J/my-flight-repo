import React from "react";
import { cancelBooking } from "../services/bookingService";

const MyBookingsPage = ({ bookings }) => {
  const handleCancel = async (bookingId) => {
    try {
      await cancelBooking(bookingId);
      alert("Your booking has been cancelled.");
    } catch (error) {
      console.error("Cancellation failed:", error);
    }
  };

  return (
    <div>
      {bookings.map((booking) => (
        <div key={booking.id}>
          <span>{booking.details}</span>
          <button onClick={() => handleCancel(booking.id)}>Cancel</button>
        </div>
      ))}
    </div>
  );
};

export default MyBookingsPage;