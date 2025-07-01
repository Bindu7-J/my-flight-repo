// ...existing imports
import axios from 'axios';
import { toast } from 'react-toastify';
// ...rest of imports

// ...inside Profile component
// ...existing code
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
          <td className="text-center">{ticket.status || 'active'}</td>
          <td className="text-center">
            <Link
              to={`/ticket/${ticket.uid}`}
              className="text-blue-500 underline"
            >
              Go to Ticket
            </Link>
            {/* Show Cancel button only for active bookings */}
            {ticket.status !== 'cancelled' && (
              <button
                className="ml-2 bg-red-500 text-white px-3 py-1 rounded"
                onClick={async () => {
                  if (window.confirm("Are you sure you want to cancel this booking?")) {
                    try {
                      const token = localStorage.getItem("token");
                      await axios.patch(
                        `${BACKENDURL}/api/v1/bookings/${ticket._id}/cancel`,
                        {},
                        { headers: { Authorization: `Bearer ${token}` } }
                      );
                      toast.success("Your booking has been cancelled.");
                      // Refresh tickets in UI
                      setTickets((prev) =>
                        prev.map((t) =>
                          t._id === ticket._id ? { ...t, status: 'cancelled' } : t
                        )
                      );
                    } catch (err) {
                      toast.error(err?.response?.data?.message || "Cancellation failed");
                    }
                  }
                }}
              >
                Cancel
              </button>
            )}
            {ticket.status === 'cancelled' && (
              <span className="ml-2 text-gray-500">Cancelled</span>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
) : (
  <p className="mt-5">No tickets found</p>
)}
// ...rest of file