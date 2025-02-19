import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Car } from '@/types/car';
import * as localStorage from '@/utils/localStorage';
import { addFavouriteCar, removeFavouriteCar, isFavouriteCar, getFavouriteCars } from '@/services/favouriteCarsService';

vi.mock('@/utils/localStorage');

describe('favouriteCarsService', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should add a new car to favorites when it doesn't exist", () => {
    vi.mocked(localStorage.localStorageGet).mockReturnValue('[]');

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

    expect(localStorage.localStorageGet).toHaveBeenCalledWith('favourite-cars');
    expect(localStorage.localStorageSet).toHaveBeenCalledWith(
      'favourite-cars',
      JSON.stringify([{ manufacturerName: 'Tesla', stockNumber: 12345 }])
    );
    expect(isFavouriteCar('Tesla', 12345)).toBe(true);
  });


});
