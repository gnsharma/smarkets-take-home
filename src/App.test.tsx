import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './pages/Home';

test('renders learn ant design link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn ant design/i);
  expect(linkElement).toBeInTheDocument();
});
