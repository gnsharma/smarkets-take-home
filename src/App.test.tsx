import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn ant design link', () => {
  render(<App />);
  const linkElement = screen.getByRole('link');
  expect(linkElement).toBeInTheDocument();
});
