// frontend/src/page/Profile.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const BACKENDURL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [tickets, setTickets] = useState([]);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${BACKENDURL}/api/v1/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
        setTickets(res.data.tickets);
      } catch (err) {
        toast.error("Failed to load profile");
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold">Profile</h2>
      {user && (
        <div className="mt-4">
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
      <h3 className="text-xl font-semibold mt-8">My Bookings</h3>
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
                <td className="text-center">{ticket.status || "active"}</td>
                <td className="text-center">
                  <Link
                    to={`/ticket/${ticket.uid}`}
                    className="text-blue-500 underline"
                  >
                    Go to Ticket
                  </Link>
                  {ticket.status === "active" && (
                    <button
                      className="ml-2 bg-red-500 text-white px-4 py-1 rounded"
                      onClick={async () => {
                        try {
                          const token = localStorage.getItem("token");
                          await axios.patch(
                            `${BACKENDURL}/api/v1/booking/cancel/${ticket._id}`,
                            {},
                            { headers: { Authorization: `Bearer ${token}` } }
                          );
                          toast.success("Your booking has been cancelled.");
                          setTickets((prev) =>
                            prev.map((t) =>
                              t._id === ticket._id ? { ...t, status: "cancelled" } : t
                            )
                          );
                        } catch (err) {
                          toast.error(
                            err.response?.data?.message ||
                              "Failed to cancel booking"
                          );
                        }
                      }}
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="mt-5">No tickets found</p>
      )}
    </div>
  );
};

export default Profile;
