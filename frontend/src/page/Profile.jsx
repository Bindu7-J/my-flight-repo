{tickets.length > 0 ? (
  <table className="table-auto w-full mt-5">
    <thead>
      <tr>
        <th>Ticket ID</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {tickets.map((ticket) => (
        <tr key={ticket._id}>
          <td className="text-center">{ticket.uid}</td>
          <td className="text-center">
            {ticket.bookings && ticket.bookings.length > 0
              ? ticket.bookings[0].status === 'cancelled'
                ? <span className="text-red-500">Cancelled</span>
                : <span className="text-green-600">Active</span>
              : <span className="text-gray-500">Unknown</span>
            }
          </td>
          <td className="text-center flex flex-col gap-2 items-center">
            <Link
              to={`/ticket/${ticket.uid}`}
              className="text-blue-500 underline"
            >
              Go to Ticket
            </Link>
            {ticket.bookings && ticket.bookings.length > 0 && ticket.bookings[0].status !== 'cancelled' && (
              <button
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-700 transition"
                onClick={async () => {
                  try {
                    const token = localStorage.getItem("token");
                    const response = await axios.patch(
                      `${BACKENDURL}/api/v1/booking/cancel/${ticket.bookings[0]._id}`,
                      {},
                      { headers: { Authorization: `Bearer ${token}` } }
                    );
                    toast.success("Your booking has been cancelled.");
                    // Optionally, refresh the tickets list
                    window.location.reload();
                  } catch (err) {
                    toast.error(
                      err.response?.data?.message || "Failed to cancel booking."
                    );
                  }
                }}
              >
                Cancel
              </button>
            )}
            {ticket.bookings && ticket.bookings.length > 0 && ticket.bookings[0].status === 'cancelled' && (
              <span className="text-xs text-gray-400">Already cancelled</span>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
) : (
  <p className="mt-5">No tickets found</p>
)}
