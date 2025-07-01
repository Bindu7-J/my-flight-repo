// tests/frontend/Profile.test.jsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Profile from "../../frontend/src/page/Profile.jsx";
import axios from "axios";

jest.mock("axios");

test("shows Cancel button for active bookings and handles cancellation", async () => {
  axios.get.mockResolvedValueOnce({
    data: {
      user: { name: "Test User", email: "test@test.com" },
      tickets: [{ _id: "123", uid: "TICKET123", status: "active" }]
    }
  });
  render(<Profile />);
  const cancelBtn = await screen.findByText("Cancel");
  expect(cancelBtn).toBeInTheDocument();
  axios.patch.mockResolvedValueOnce({ data: { success: true } });
  fireEvent.click(cancelBtn);
  await waitFor(() => {
    expect(axios.patch).toHaveBeenCalled();
  });
});
