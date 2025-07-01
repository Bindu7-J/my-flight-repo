import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Profile from "./Profile";
import axios from "axios";

jest.mock("axios");

describe("Profile Booking Cancellation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("shows Cancel button for active bookings", () => {
    const bookings = [
      { _id: "1", status: "active" },
      { _id: "2", status: "cancelled" },
    ];
    render(<Profile />);
    // Simulate bookings state and check for Cancel button
    // (You may need to mock useState/useEffect or refactor Profile for testability)
  });

  test("calls API and shows confirmation on cancel", async () => {
    axios.patch.mockResolvedValue({ data: { success: true } });
    // Render Profile, simulate click, and check for confirmation message
    // (You may need to mock bookings and state updates)
  });
});
