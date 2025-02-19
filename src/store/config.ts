import { CarsCollectionParams, CarsCollectionPaginated, Manufacturer, Car } from '@/types/car';

export interface AppStoreState {
  carsCollectionPaginated: CarsCollectionPaginated | undefined;
  loading: boolean;
  error: string;
  selectedCar: Car | null;
  carColors: string[];
  manufacturerList: Manufacturer[];
  paginatedCarCollectionParams: CarsCollectionParams;
  viewState: 'loading' | 'error' | 'noResults' | 'list' | 'details';
}

export const INITIAL_APP_STORE_STATE: AppStoreState = {
  carsCollectionPaginated: undefined,
  loading: true,
  error: '',
  selectedCar: null,
  carColors: [],
  manufacturerList: [],
  paginatedCarCollectionParams: {
    page: 1,
  },
  viewState: 'loading',
};