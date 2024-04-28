import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from './Button';

test('renders a button', () => {
    render(<Button />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
});
