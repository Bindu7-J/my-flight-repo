// Updated MyBookings component with Cancel button
import React from 'react';

function MyBookings() {
  const handleCancel = (bookingId) => {
    // Logic to cancel booking
    console.log(`Booking ${bookingId} cancelled.`);
  };

  return (
    <div>
      <h1>My Bookings</h1>
      {/* Example booking list */}
      <ul>
        <li>
          Booking 1 <button onClick={() => handleCancel(1)}>Cancel</button>
        </li>
        <li>
          Booking 2 <button onClick={() => handleCancel(2)}>Cancel</button>
        </li>
      </ul>
    </div>
  );
}

export default MyBookings;