import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Profile from "../page/Profile";
import { authContext } from "../context/authContext";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ success: true }),
  })
);

describe("Profile page", () => {
  it("shows Cancel button for active bookings and handles cancellation", async () => {
    const tickets = [
      { _id: "1", uid: "ABC123", status: "active" },
      { _id: "2", uid: "DEF456", status: "cancelled" },
    ];
    render(
      <authContext.Provider value={{ dispatch: jest.fn() }}>
        <Profile />
      </authContext.Provider>
    );
    // Simulate tickets loaded
    // (You may need to mock useState or axios/fetch as per actual implementation)
    // Find Cancel button
    const cancelBtn = await screen.findByText("Cancel");
    fireEvent.click(cancelBtn);
    await waitFor(() =>
      expect(screen.getByText("Your booking has been cancelled.")).toBeInTheDocument()
    );
  });
});
