import React, { JSX, useEffect } from 'react';
import { Box, Button, Typography, Grid2, Stack } from '@mui/material';
import { Car } from '@/types/car';
import { isFavouriteCar, addFavouriteCar, removeFavouriteCar } from '@/services/favouriteCarsService';
import IconButton from '@mui/material/IconButton';
import CloseIcopn from '@mui/icons-material/Close';
interface Props {
  car: Car;
  onClose: () => void;
}

/**
 * CarDetails component displays detailed information about a car and allows users to save/remove it from favorites.
 *
 * @param {Object} props - The component props.
 * @param {Car} props.car - The car object containing details to be displayed.
 * @param {() => void} props.onClose - Function to be called when the user closes the details view.
 * @returns {JSX.Element} A React component that renders the car details.
 */

const CarDetails = ({ car, onClose }: Props): JSX.Element => {
  const [isFavourite, setFavourite] = React.useState(false);

  useEffect(() => {
    isFavouriteCar(car.manufacturerName, car.stockNumber) ? setFavourite(true) : setFavourite(false);
  }, [car.manufacturerName, car.stockNumber]);

  const handleFavourite = (car: Car) => {
    if (isFavourite) {
      removeFavouriteCar(car.manufacturerName, car.stockNumber);
      isFavouriteCar(car.manufacturerName, car.stockNumber) ? setFavourite(true) : setFavourite(false);
    } else {
      addFavouriteCar(car);
      isFavouriteCar(car.manufacturerName, car.stockNumber) ? setFavourite(true) : setFavourite(false);
    }
  };
  return (
    <Stack gap={3} alignItems="center">
      <IconButton color="primary" sx={{ position: 'absolute', right: '20px', top: '20px' }} onClick={() => onClose()} data-testid="close-button">
        <CloseIcopn />
      </IconButton>
      <Stack spacing={4} bgcolor="#ededed" width="100%">
        <Stack
          spacing={4}
          width="100%"
          maxWidth={800}
          minHeight={300}
          alignSelf="center"
          justifyContent="center"
          alignItems="center"
        >
          <Box component="img" maxWidth={150} src={car.pictureUrl} alt={`${car.manufacturerName} ${car.modelName}`} />
        </Stack>
      </Stack>
      <Grid2 container maxWidth={800} columnSpacing={9} rowSpacing={4}>
        <Grid2 size={{ sm: 12, md: 7 }}>
          <Stack spacing={2} >
            <Typography component="h2" variant="h2">
              {car.manufacturerName} {car.modelName}
            </Typography>
            <Typography component="p" variant="body2" textTransform='capitalize'>
              Stock # {car.stockNumber} - {car.mileage.number} {car.mileage.unit} - {car.fuelType} - {car.color}
            </Typography>
            <Typography component="p">
              This car is currently available and can be delivered as soon as tomorrow morning. Please be aware that
              delivery times shown in this page are not definitive and may change due to bad weather conditions.
            </Typography>
          </Stack>
        </Grid2>
        <Grid2 size={{ sm: 12, md: 5 }}>
          <Stack spacing={2} border={1} p={3}  sx={{ borderColor: 'divider' }}>
            <Typography component={'p'}>
              If you like this car, click the button and save it in your collection of favourite items.
            </Typography>
            <Button
              variant="contained"
              onClick={() => handleFavourite(car)}
              sx={{ alignSelf: 'end', minWidth: '140px' }}
              disableElevation
            >
              {isFavourite ? 'Remove' : 'Save'}
            </Button>
          </Stack>
        </Grid2>
      </Grid2>
    </Stack>
  );
};

export default CarDetails;
