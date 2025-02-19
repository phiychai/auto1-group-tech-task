import { it, vi, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CarsFilter from '@/components/CarsFilter';
import { useAppStore } from '@/store/AppStore';
import userEvent from '@testing-library/user-event';

vi.mock('@/store/AppStore');

it('should update local state when color is selected', () => {
  const mockState = {
    carColors: ['red', 'blue', 'green'],
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

  render(<CarsFilter />);

  const colorSelect = screen.getByLabelText(/color/i) as HTMLSelectElement;
  fireEvent.change(colorSelect, { target: { value: 'blue' } });

  expect(colorSelect.value).toBe('blue');
});
it('should dispatch filter action with correct parameters when Filter button is clicked', async () => {
  const mockState = {
    carColors: ['red', 'blue', 'green'],
    manufacturerList: [
      { name: 'Audi', models: [] },
      { name: 'BMW', models: [] },
    ],
    paginatedCarCollectionParams: { color: '', manufacturer: '', page: 1 },
    carsCollectionPaginated: { cars: [], totalCarsCount: 0, totalPageCount: 0 },
    loading: false,
    error: '',
    selectedCar: null,
    viewState: 'list' as const,
  };
  const mockDispatch = vi.fn();

  vi.mocked(useAppStore).mockReturnValue([mockState, mockDispatch]);

  render(<CarsFilter />);

  // Select color
  const colorSelect = screen.getByLabelText(/color/i);
  fireEvent.change(colorSelect, { target: { value: 'blue' } });

  // Select manufacturer
  const manufacturerSelect = screen.getByLabelText(/manufacturer/i);
  fireEvent.change(manufacturerSelect, { target: { value: 'Audi' } });

  // Click filter button
  const filterButton = screen.getByRole('button', { name: /filter/i });
  await userEvent.click(filterButton);

  expect(mockDispatch).toHaveBeenCalledWith({
    type: 'SET_CARS_COLLECTION_PARAMS',
    payload: {
      color: 'blue',
      manufacturer: 'Audi',
      page: 1,
    },
  });
});
