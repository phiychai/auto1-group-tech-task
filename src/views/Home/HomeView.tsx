import React, { useEffect, useCallback } from 'react';
import { Grid2, Box } from '@mui/material';
import { AppView } from '@/components';
import CarFilter from '@/components/CarsFilter';
import CarDetails from '@/components/CarDetails';
import CarsCollection from '@/components/CarsCollection';
import { Car } from '@/types/car';
import { apiService } from '@/services/apiService';
import { useAppStore } from '@/store/AppStore';

const ErrorMessage = ({ message }: { message: string }) => <h2>{message}</h2>;

const NoResults = () => <h2>No cars found with selected criteria.</h2>;

/**
 * HomeView component for displaying the main page of the car listing application.
 *
 * This component manages the state of the application, including:
 * - Fetching and displaying car data
 * - Handling pagination
 * - Managing selected car details
 * - Rendering different views based on the current state (loading, error, no results, list, details)
 *
 * @returns {React.ReactElement} The rendered HomeView component
 */

const HomeView = (): React.ReactElement => {
  const [state, dispatch] = useAppStore();
  const onPageChange = useCallback(
    (page: number) => {
      dispatch({ type: 'SET_CARS_COLLECTION_PARAMS', payload: { page } });
    },
    [dispatch]
  );

  const handleSelect = (car: Car) => {
    dispatch({ type: 'SET_SELECTED_CAR', payload: car });
  };

  const handleClose = () => {
    dispatch({ type: 'SET_SELECTED_CAR', payload: null });
  };

  useEffect(() => {
    const fetchAllData = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const [colors, manufacturers, carsData] = await Promise.all([
          apiService.getColors(),
          apiService.getManufacturers(),
          apiService.getCars(state.paginatedCarCollectionParams),
        ]);

        dispatch({ type: 'SET_CAR_COLORS', payload: colors });
        dispatch({ type: 'SET_MANUFACTURERS', payload: manufacturers });
        dispatch({ type: 'SET_CARS_COLLECTION', payload: carsData });
        dispatch({ type: 'SET_VIEW_STATE', payload: carsData.cars.length > 0 ? 'list' : 'noResults' });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Connection error' });
        dispatch({ type: 'SET_VIEW_STATE', payload: 'error' });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    fetchAllData();
  }, [state.paginatedCarCollectionParams, dispatch]);

  const renderContent = () => {
    const contentMap: Record<typeof state.viewState, React.ReactNode> = {
      loading: null,
      error: <ErrorMessage message={state.error} />,
      noResults: <NoResults />,
      list: state.carsCollectionPaginated && (
        <CarsCollection
          CarsCollectionPaginated={state.carsCollectionPaginated}
          currentPage={state.paginatedCarCollectionParams.page}
          isLoading={state.loading}
          changeCurrentPage={onPageChange}
          onSelect={handleSelect}
        />
      ),
      details: null,
    };

    return contentMap[state.viewState];
  };

  return (
    <AppView>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: state.selectedCar ? 'calc(100vh - 80px - 144px)' : 'auto', // Assuming 80px header and 80px footer
          overflow: state.selectedCar ? 'hidden' : 'visible',
        }}
      >
        <Grid2 container spacing={3} width="100%">
          <Grid2 size={4}>
            <CarFilter />
          </Grid2>
          <Grid2 size={8}>{renderContent()}</Grid2>
        </Grid2>
        {state.selectedCar && (
          <Box
            sx={{
              position: 'fixed',
              top: 80,
              left: 0,
              right: 0,
              bottom: 80,
              backgroundColor: '#fff',
              zIndex: 1000,
              overflow: 'auto',
              padding: 0,
            }}
          >
            <CarDetails car={state.selectedCar} onClose={handleClose} />
          </Box>
        )}
      </Box>
    </AppView>
  );
};

export default HomeView;
