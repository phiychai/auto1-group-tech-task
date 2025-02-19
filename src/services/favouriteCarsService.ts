import { Car } from "@/types/car";
import { localStorageGet, localStorageSet } from "@/utils/localStorage";

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
      console.warn('Invalid data in localStorage for favourite cars. Resetting to empty array.');
      // If there's an error parsing, we'll use an empty array
      cars = [];
    }
  } else if (Array.isArray(storedFavouriteCars)) {
    cars = storedFavouriteCars;
  }

  // Ensure that cars is always an array
  if (!Array.isArray(cars)) {
    console.warn('Stored favourite cars data is not an array. Resetting to empty array.');
    cars = [];
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

