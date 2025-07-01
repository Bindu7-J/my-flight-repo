import { render, screen, fireEvent } from '@testing-library/react';
import Profile from '../Profile';
import axios from 'axios';

jest.mock('axios');

test('cancels a booking and shows confirmation', async () => {
  // Setup: mock tickets, axios.patch, etc.
  // Render Profile, click Cancel, expect toast and status update
});
