// ... (other imports)
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { BACKENDURL } from "../utils/api";

// ... (other Profile component code)

{tickets.map((ticket) => (
  <tr key={ticket._id}>
    <td className="text-center">{ticket.uid}</td>
    <td className="text-center">
      <Link
        to={`/ticket/${ticket.uid}`}
        className="text-blue-500 underline"
      >
        Go to Ticket
      </Link>
      {ticket.status === "active" && (
        <button
          className="ml-2 bg-red-500 text-white px-3 py-1 rounded"
          onClick={async () => {
            try {
              const token = localStorage.getItem("token");
              const res = await fetch(
                `${BACKENDURL}/api/v1/bookings/${ticket._id}/cancel`,
                {
                  method: "PATCH",
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                }
              );
              const data = await res.json();
              if (data.success) {
                toast.success("Your booking has been cancelled.");
                // Optionally, refresh bookings list
              } else {
                toast.error(data.message || "Cancellation failed.");
              }
            } catch (err) {
              toast.error("Cancellation failed.");
            }
          }}
        >
          Cancel
        </button>
      )}
      {ticket.status === "cancelled" && (
        <span className="ml-2 text-gray-400">Cancelled</span>
      )}
    </td>
  </tr>
))}

// ... (rest of Profile component code)
