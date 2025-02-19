import { useState, useEffect, useCallback } from 'react';
import { Car } from '@/types/car';
import {
  getFavouriteCars,
  addFavouriteCar,
  removeFavouriteCar,
  isFavouriteCar
} from '@/services/favouriteCarsService';

export const useFavouriteCars = () => {
  const [favouriteCars, setFavouriteCars] = useState<Car[]>([]);

  useEffect(() => {
    setFavouriteCars(getFavouriteCars());
  }, []);

  const addToFavourites = useCallback((car: Car) => {
    addFavouriteCar(car);
    setFavouriteCars(getFavouriteCars());
  }, []);

  const removeFromFavourites = useCallback((manufacturerName: string, stockNumber: number) => {
    removeFavouriteCar(manufacturerName, stockNumber);
    setFavouriteCars(getFavouriteCars());
  }, []);

  const checkIsFavourite = useCallback((manufacturerName: string, stockNumber: number) => {
    return isFavouriteCar(manufacturerName, stockNumber);
  }, []);

  return { favouriteCars, addToFavourites, removeFromFavourites, checkIsFavourite };
};