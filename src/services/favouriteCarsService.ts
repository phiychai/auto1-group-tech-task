import { Car } from "@/types/car";
import { localStorageGet, localStorageSet } from "@/utils/localStorage";
/**
 * Adds a car to the list of favorite cars.
 *
 * This function loads the current list of favorite cars, adds the new car to the list,
 * and then saves the updated list back to storage.
 *
 * @param car - The car object to be added to favorites.
 *              It should have properties 'manufacturerName' and 'stockNumber'.
 *
 * @returns void - This function doesn't return anything.
 */
const FAVOURITE_CARS_STORAGE_KEY = "favourite-cars";

let cachedFavouriteCars: Set<string> | null = null;

const getFavouriteCarKey = (car: Car): string => `${car.manufacturerName}-${car.stockNumber}`;

const loadFavouriteCars = (): Set<string> => {
  if (cachedFavouriteCars) return cachedFavouriteCars;

  const storedFavouriteCars = localStorageGet(FAVOURITE_CARS_STORAGE_KEY);
  let cars: Car[] = [];

  if (typeof storedFavouriteCars === 'string') {
    try {
      cars = JSON.parse(storedFavouriteCars);
    } catch (error) {
      console.error('Error parsing stored favoutite cars:', error);
    }
  } else if (Array.isArray(storedFavouriteCars)) {
    cars = storedFavouriteCars;
  }

  cachedFavouriteCars = new Set(cars.map(getFavouriteCarKey));
  return cachedFavouriteCars;
};

const saveFavouriteCar = (): void => {
  if (!cachedFavouriteCars) return;
  const carsArray = Array.from(cachedFavouriteCars).map(key => {
    const [manufacturerName, stockNumber] = key.split('-');
    return { manufacturerName, stockNumber: parseInt(stockNumber, 10) };
  });
  localStorageSet(FAVOURITE_CARS_STORAGE_KEY, JSON.stringify(carsArray));
};

export const addFavouriteCar = (car: Car): void => {
  const favourites = loadFavouriteCars();
  favourites.add(getFavouriteCarKey(car));
  saveFavouriteCar();
};

export const removeFavouriteCar = (manufacturerName: string, stockNumber: number): void => {
  const favourites = loadFavouriteCars();
  favourites.delete(`${manufacturerName}-${stockNumber}`);
  saveFavouriteCar();
};

export const isFavouriteCar = (manufacturerName: string, stockNumber: number): boolean => {
  const favourites = loadFavouriteCars();
  return favourites.has(`${manufacturerName}-${stockNumber}`);
};

export const getFavouriteCars = (): Car[] => {
  const favourites = loadFavouriteCars();
  return Array.from(favourites).map(key => {
    const [manufacturerName, stockNumber] = key.split('-');
    return { manufacturerName, stockNumber: parseInt(stockNumber, 10) } as Car;
  });
};

