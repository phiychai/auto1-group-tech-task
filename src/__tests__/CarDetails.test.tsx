import { it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import '@testing-library/jest-dom';
import CarDetails from '@/components/CarDetails';
import { Car } from '@/types/car';

it('should call the onClose function when the close icon button is clicked', () => {
  const mockCar: Car = {
    stockNumber: 1,
    manufacturerName: 'Audi',
    modelName: 'A1',
    color: 'red',
    mileage: { number: 10000, unit: 'km' },
    fuelType: 'Petrol | Electric ',
    pictureUrl: 'https://example.com/car.jpg',
  };
  const mockOnClose = vi.fn();

  render(<CarDetails car={mockCar} onClose={mockOnClose} />);

  // Use a more specific query to find the close button
  const closeButton = screen.getByTestId('close-button');

  // Ensure the button is in the document
  expect(closeButton).toBeInTheDocument();

  fireEvent.click(closeButton);

  expect(mockOnClose).toHaveBeenCalledTimes(1);
});

it('should render the car manufacturer name and model correctly', () => {
  const mockCar: Car = {
    stockNumber: 1,
    manufacturerName: 'Audi',
    modelName: 'A1',
    color: 'red',
    mileage: { number: 10000, unit: 'km' },
    fuelType: 'Petrol | Electric ',
    pictureUrl: 'https://example.com/car.jpg',
  };

  render(<CarDetails car={mockCar} onClose={() => {}} />);

  const carNameElement = screen.getByRole('heading', { level: 2 });
  expect(carNameElement).toHaveTextContent('Audi A1');
});
