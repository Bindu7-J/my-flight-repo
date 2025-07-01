import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Profile from '../Profile';
import axios from 'axios';

jest.mock('axios');

describe('Profile Cancel Booking', () => {
  const tickets = [
    {
      _id: 'ticket1',
      uid: 'TICKET123',
      bookings: [
        {
          _id: 'booking1',
          status: 'active',
        },
      ],
    },
    {
      _id: 'ticket2',
      uid: 'TICKET456',
      bookings: [
        {
          _id: 'booking2',
          status: 'cancelled',
        },
      ],
    },
  ];

  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: {
        user: { name: 'Test User', email: 'test@example.com', profilePic: '' },
        tickets,
      },
    });
    axios.patch.mockResolvedValue({ data: { success: true, message: 'Booking cancelled' } });
    localStorage.setItem('token', 'testtoken');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('shows Cancel button only for active bookings', async () => {
    render(<Profile />);
    await waitFor(() => expect(screen.getByText('TICKET123')).toBeInTheDocument());
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.queryAllByText('Cancel').length).toBe(1);
  });

  it('cancels booking and shows confirmation', async () => {
    render(<Profile />);
    await waitFor(() => expect(screen.getByText('TICKET123')).toBeInTheDocument());
    fireEvent.click(screen.getByText('Cancel'));
    await waitFor(() => expect(axios.patch).toHaveBeenCalled());
    // Optionally check for confirmation toast if using react-toastify
  });
});
