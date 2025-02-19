import { describe, it, expect, vi } from 'vitest';
import { Car } from '@/types/car';
import { localStorageGet, localStorageSet } from '@/utils/localStorage';
import { addFavouriteCar, removeFavouriteCar, isFavouriteCar, getFavouriteCars } from '@/services/favouriteCarsService';

describe('favouriteCarsService', () => {

});
it('should add a new car to favorites when it doesn\'t exist', () => {
  vi.mock('@/utils/localStorage', () => ({
    localStorageGet: vi.fn().mockReturnValue('[]'),
    localStorageSet: vi.fn(),
  }));

  const car: Car = {
    manufacturerName: 'Tesla',
    stockNumber: 12345,
    modelName: 'Model 3',
    color: 'red',
    mileage: { number: 10000, unit: 'km' },
    fuelType: 'Petrol | Electric ',
    pictureUrl: 'https://example.com/tesla.jpg',
  };

  addFavouriteCar(car);

  expect(localStorageGet).toHaveBeenCalledWith('favourite-cars');
  expect(localStorageSet).toHaveBeenCalledWith(
    'favourite-cars',
    JSON.stringify([{ manufacturerName: 'Tesla', stockNumber: 12345 }])
  );
  expect(isFavouriteCar('Tesla', 12345)).toBe(true);
});
it('should remove a car from favorites when it exists', () => {
  vi.mock('@/utils/localStorage', () => ({
    localStorageGet: vi.fn().mockReturnValue(JSON.stringify([
      { manufacturerName: 'Tesla', stockNumber: 12345 },
      { manufacturerName: 'BMW', stockNumber: 67890 }
    ])),
    localStorageSet: vi.fn(),
  }));

  removeFavouriteCar('Tesla', 12345);

  expect(localStorageGet).toHaveBeenCalledWith('favourite-cars');
  expect(localStorageSet).toHaveBeenCalledWith(
    'favourite-cars',
    JSON.stringify([{ manufacturerName: 'BMW', stockNumber: 67890 }])
  );
  expect(isFavouriteCar('Tesla', 12345)).toBe(false);
  expect(isFavouriteCar('BMW', 67890)).toBe(true);
});

it('should correctly load favorite cars from local storage', () => {
  const mockStoredCars = JSON.stringify([
    { manufacturerName: 'Tesla', stockNumber: 12345 },
    { manufacturerName: 'BMW', stockNumber: 67890 }
  ]);

  vi.mock('@/utils/localStorage', () => ({
    localStorageGet: vi.fn().mockReturnValue(mockStoredCars),
    localStorageSet: vi.fn(),
  }));

  const result = getFavouriteCars();

  expect(localStorageGet).toHaveBeenCalledWith('favourite-cars');
  expect(result).toEqual([
    { manufacturerName: 'Tesla', stockNumber: 12345 },
    { manufacturerName: 'BMW', stockNumber: 67890 }
  ]);
  expect(isFavouriteCar('Tesla', 12345)).toBe(true);
  expect(isFavouriteCar('BMW', 67890)).toBe(true);
  expect(isFavouriteCar('Audi', 11111)).toBe(false);
});