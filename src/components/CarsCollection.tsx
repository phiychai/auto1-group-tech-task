import React from 'react';
import { Car, CarsCollectionPaginated } from '@/types/car';
import { Box, Button, Card, CardContent, CardMedia, Grid2, Stack, Typography, Skeleton } from '@mui/material';

interface Props {
  isLoading: boolean;
  CarsCollectionPaginated: CarsCollectionPaginated;
  currentPage: number;
  changeCurrentPage(page: number): void;
  onSelect: (car: Car) => void;
}
/**
 * Renders a collection of cars with pagination controls.
 *
 * @param {Object} props - The component props.
 * @param {CarsCollectionPaginated} props.CarsCollectionPaginated - The paginated collection of cars.
 * @param {number} props.currentPage - The current page number.
 * @param {boolean} props.isLoading - Indicates whether the data is currently loading.
 * @param {(page: number) => void} props.changeCurrentPage - Function to change the current page.
 * @param {(car: Car) => void} props.onSelect - Function to handle car selection.
 * @returns {React.ReactElement} A React element representing the cars collection with pagination.
 */

const CarsCollection = ({
  CarsCollectionPaginated,
  currentPage,
  isLoading,
  changeCurrentPage,
  onSelect,
}: Props): React.ReactElement => {
  const { cars } = CarsCollectionPaginated || [];

  return (
    <Grid2 size={{ xl: 9, md: 12 }}>
      <Stack component={'section'} gap={2} width={'100%'}>
        <Typography component="h2" variant="h3">
          Available cars
        </Typography>
        <Typography component="p" variant="body2">
          Showing {cars.length} of {CarsCollectionPaginated.totalCarsCount} results
        </Typography>
        <Grid2 container spacing={2} component={'ul'} p={0}>
          {cars.map((car: Car, index: number) => (
            <Grid2
              key={car.stockNumber + index}
              component={'li'}
              width="100%"
              p={3}
              display="flex"
              border="1px solid"
              sx={{ borderColor: 'divider' }}
            >
              <Card
                elevation={0}
                sx={{
                  display: 'flex',
                  width: '100%',
                  alignItems: 'center',
                }}
              >
                {isLoading ? (
                  <>
                    <CardContent
                      sx={{
                        display: 'flex',
                        width: '100%',
                        alignItems: 'center',
                        padding: 0,
                        gap: 2,
                        paddingBottom: '0!important',
                      }}
                    >
                      <Stack>
                        <Skeleton variant="rectangular" width="70px" height="66px" />
                      </Stack>
                      <Stack display="flex" width="100%" gap={1}>
                        <Skeleton variant="rectangular" width="100%" height={16} data-testid="skeleton-loader" />
                        <Skeleton variant="rectangular" width="100%" height={11} data-testid="skeleton-loader" />
                        <Skeleton variant="rectangular" width="40%" height={10} data-testid="skeleton-loader" />
                      </Stack>
                    </CardContent>
                  </>
                ) : (
                  <>
                    <CardMedia
                      component="img"
                      image={car.pictureUrl}
                      alt={`${car.manufacturerName} ${car.modelName}`}
                      sx={{ maxHeight: '70px', maxWidth: '70px', objectFit: 'contain' }}
                    />
                    <CardContent
                      sx={{ display: 'flex', flexDirection: 'column', paddingTop: '0', paddingBottom: '0!important' }}
                    >
                      <Typography variant="h3" component="h3">
                        {car.manufacturerName} {car.modelName}
                      </Typography>
                      <Typography variant="body1" component="span" textTransform="capitalize">
                        Stock # {car.stockNumber} - {car.mileage.number} {car.mileage.unit} - {car.fuelType} -{' '}
                        {car.color}
                      </Typography>
                      <Button
                        variant="text"
                        onClick={() => onSelect(car)}
                        sx={{ paddingLeft: '0', alignSelf: 'flex-start' }}
                      >
                        View details
                      </Button>
                    </CardContent>
                  </>
                )}
              </Card>
            </Grid2>
          ))}
        </Grid2>
        <Box component="nav" gap={3} justifyContent="center" display="flex">
          <Button
            variant="text"
            onClick={() => changeCurrentPage(1)}
            disabled={currentPage === 1 || isLoading}
            sx={{ paddingLeft: '0', minWidth: '0px' }}
          >
            First
          </Button>
          <Button
            variant="text"
            onClick={() => changeCurrentPage(currentPage - 1)}
            disabled={currentPage === 1 || isLoading}
            sx={{ paddingLeft: '0', minWidth: '0px' }}
          >
            Previous
          </Button>
          <Typography component="span">
            Page {currentPage} of {CarsCollectionPaginated.totalPageCount}
          </Typography>
          <Button
            variant="text"
            onClick={() => changeCurrentPage(currentPage + 1)}
            disabled={currentPage === CarsCollectionPaginated.totalPageCount || isLoading}
            sx={{ paddingLeft: '0', minWidth: '0px' }}
          >
            Next
          </Button>
          <Button
            variant="text"
            onClick={() => changeCurrentPage(CarsCollectionPaginated.totalPageCount)}
            disabled={currentPage === CarsCollectionPaginated.totalPageCount || isLoading}
            sx={{ paddingLeft: '0', minWidth: '0px' }}
          >
            Last
          </Button>
        </Box>
      </Stack>
    </Grid2>
  );
};

export default CarsCollection;
