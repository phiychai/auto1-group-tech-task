import { Reducer } from 'react';
import { AppStoreState } from './config';
import { CarsCollectionParams, CarsCollectionPaginated, Manufacturer, Car } from '@/types/car';

export type AppStoreAction =
  | { type: 'SET_CARS_COLLECTION'; payload: CarsCollectionPaginated | undefined }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'SET_SELECTED_CAR'; payload: Car | null }
  | { type: 'SET_CAR_COLORS'; payload: string[] }
  | { type: 'SET_MANUFACTURERS'; payload: Manufacturer[] }
  | { type: 'SET_CARS_COLLECTION_PARAMS'; payload: Partial<CarsCollectionParams> }
  | { type: 'SET_VIEW_STATE'; payload: 'loading' | 'error' | 'noResults' | 'list' | 'details' };

/**
 * Reducer function for managing the application store state.
 * This function handles various actions to update different parts of the store state.
 *
 * @param state - The current state of the application store.
 * @param action - The action object containing the type of action and its payload.
 * @returns A new state object with the updates applied based on the action type.
 */

const AppStoreReducer: Reducer<AppStoreState, AppStoreAction> = (state, action) => {
  switch (action.type) {
    case 'SET_CARS_COLLECTION':
      return { ...state, carsCollectionPaginated: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_SELECTED_CAR':
      return { ...state, selectedCar: action.payload };
    case 'SET_CAR_COLORS':
      return { ...state, carColors: action.payload };
    case 'SET_MANUFACTURERS':
      return { ...state, manufacturerList: action.payload };
    case 'SET_CARS_COLLECTION_PARAMS':
      return { ...state, paginatedCarCollectionParams: { ...state.paginatedCarCollectionParams, ...action.payload } };
    case 'SET_VIEW_STATE':
      return { ...state, viewState: action.payload };
    default:
      return state;
  }
};

export default AppStoreReducer;
