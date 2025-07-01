import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Profile from "../Profile";
import axios from "axios";

jest.mock("axios");

describe("Profile page", () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: {
        user: { name: "Test User", email: "test@example.com", profilePic: "" },
        tickets: [
          {
            uid: "TICKET123",
            tickets: [
              {
                _id: "booking1",
                status: "active",
              },
              {
                _id: "booking2",
                status: "cancelled",
              },
            ],
          },
        ],
      },
    });
  });

  it("Cancel button is visible for active bookings and works", async () => {
    axios.patch.mockResolvedValue({ data: { success: true, message: "Booking cancelled" } });

    render(<Profile />);
    await waitFor(() => screen.getByText("TICKET123"));

    const cancelButton = screen.getAllByText("Cancel")[0];
    expect(cancelButton).toBeInTheDocument();

    window.confirm = jest.fn(() => true);

    fireEvent.click(cancelButton);

    await waitFor(() => expect(axios.patch).toHaveBeenCalled());
    // Optionally check for toast message or UI update
  });

  it("Cancel button not visible for cancelled bookings", async () => {
    render(<Profile />);
    await waitFor(() => screen.getByText("TICKET123"));

    // Only one cancel button for the active booking
    const cancelButtons = screen.getAllByText("Cancel");
    expect(cancelButtons.length).toBe(1);
  });
});
