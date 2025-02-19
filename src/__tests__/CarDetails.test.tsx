import { it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
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

  const closeButton = screen.getByTestId('close-button');

  expect(closeButton).toBeDefined();

  fireEvent.click(closeButton);

  expect(mockOnClose).toHaveBeenCalled();
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
  expect(carNameElement.textContent).toBe('Audi A1');
});