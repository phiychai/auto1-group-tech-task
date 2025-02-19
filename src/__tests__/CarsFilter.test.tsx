import { describe, it, vi, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import CarsFilter from '@/components/CarsFilter';
import { useAppStore } from '@/store/AppStore';

vi.mock('@/store/AppStore');

it('should update local state when color is selected', () => {
  const mockState = {
    carColors: ['Red', 'Blue', 'Green'],
    manufacturerList: [],
    paginatedCarCollectionParams: { color: '', manufacturer: '', page: 1 },
    carsCollectionPaginated: { cars: [], totalCarsCount: 0, totalPageCount: 0 },
    loading: false,
    error: '',
    selectedCar: null,
    viewState: 'list' as const,
  };
  const mockDispatch = vi.fn();

  vi.mocked(useAppStore).mockReturnValue([mockState, mockDispatch]);

  const { getByTestId } = render(<CarsFilter />);
  const colorSelect = getByTestId('select-color');

  fireEvent.mouseDown(colorSelect);
  const blueOption = getByTestId('select-color-item-Blue');
  fireEvent.click(blueOption);

  expect(colorSelect).toHaveTextContent('Blue');
});
it('should dispatch filter action with correct parameters when Filter button is clicked', () => {
  const mockState = {
    carColors: ['Red', 'Blue', 'Green'],
    manufacturerList: [{ name: 'Audi', models: [] }, { name: 'BMW', models: [] }],
    paginatedCarCollectionParams: { color: '', manufacturer: '', page: 1 },
    carsCollectionPaginated: { cars: [], totalCarsCount: 0, totalPageCount: 0 },
    loading: false,
    error: '',
    selectedCar: null,
    viewState: 'list' as const,
  };
  const mockDispatch = vi.fn();

  vi.mocked(useAppStore).mockReturnValue([mockState, mockDispatch]);

  const { getByTestId } = render(<CarsFilter />);

  const colorSelect = getByTestId('select-color');
  fireEvent.mouseDown(colorSelect);
  const blueOption = getByTestId('select-color-item-Blue');
  fireEvent.click(blueOption);

  const manufacturerSelect = getByTestId('select-manufacturer');
  fireEvent.mouseDown(manufacturerSelect);
  const audiOption = getByTestId('select-manufacturer-item-Audi');
  fireEvent.click(audiOption);

  const filterButton = getByTestId('filter-button');
  fireEvent.click(filterButton);

  expect(mockDispatch).toHaveBeenCalledWith({
    type: 'SET_CARS_COLLECTION_PARAMS',
    payload: {
      color: 'Blue',
      manufacturer: 'Audi',
      page: 1,
    },
  });
});