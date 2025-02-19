import { describe, it, vi, expect } from 'vitest';
import { CarsCollectionPaginated } from '@/types/car';
import { render, screen } from '@testing-library/react';
import CarsCollection from '@/components/CarsCollection';

describe('CarsCollection', () => {
  const baseMockCarsCollectionPaginated: CarsCollectionPaginated = {
    cars: [
      {
        stockNumber: 1,
        manufacturerName: 'Audi',
        modelName: 'A1',
        color: 'red',
        mileage: { number: 10000, unit: 'km' },
        fuelType: 'Petrol | Electric',
        pictureUrl: 'https://example.com/car.jpg',
      },
    ],
    totalPageCount: 1,
    totalCarsCount: 1,
  };

  it('should render the correct number of car items based on the CarsCollectionPaginated data', () => {
    const mockCarsCollectionPaginated: CarsCollectionPaginated = {
      cars: [
        {
          stockNumber: 1,
          manufacturerName: 'Audi',
          modelName: 'A1',
          color: 'red',
          mileage: { number: 10000, unit: 'km' },
          fuelType: 'Petrol | Electric',
          pictureUrl: 'https://example.com/car1.jpg',
        },
        {
          stockNumber: 2,
          manufacturerName: 'BMW',
          modelName: 'X5',
          color: 'blue',
          mileage: { number: 20000, unit: 'km' },
          fuelType: 'Diesel',
          pictureUrl: 'https://example.com/car2.jpg',
        },
      ],
      totalPageCount: 1,
      totalCarsCount: 2,
    };

    const { getAllByRole } = render(
      <CarsCollection
        CarsCollectionPaginated={mockCarsCollectionPaginated}
        currentPage={1}
        isLoading={false}
        changeCurrentPage={vi.fn()}
        onSelect={vi.fn()}
      />
    );

    const carItems = getAllByRole('listitem');
    expect(carItems).toHaveLength(2);
  });

  it('should display loading skeletons when isLoading is true', () => {
    render(
      <CarsCollection
        CarsCollectionPaginated={baseMockCarsCollectionPaginated}
        currentPage={1}
        isLoading={true}
        changeCurrentPage={vi.fn()}
        onSelect={vi.fn()}
      />
    );

    // Look for elements with a specific test ID for skeletons
    const skeletons = screen.getAllByTestId('skeleton-loader');

    // Assuming there are 3 skeleton elements per car item
    expect(skeletons).toHaveLength(baseMockCarsCollectionPaginated.cars.length * 3);
  });
});