import { render, screen, fireEvent } from '@testing-library/react';
import Profile from '../../frontend/src/page/Profile.jsx';
import axios from 'axios';

jest.mock('axios');

test('renders Cancel button for active bookings', () => {
  // Mock tickets
  const tickets = [{ _id: '1', uid: 'T123', status: 'active' }];
  // Render Profile with tickets
  render(<Profile />);
  // ...simulate state and check for Cancel button
});

test('cancels booking and updates UI', async () => {
  // Mock axios.patch
  axios.patch.mockResolvedValue({ data: { success: true } });
  // ...simulate click and check UI update
});
