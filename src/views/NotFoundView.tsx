import { Typography, Grid2, Stack, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { AppView } from '@/components';

const NotFoundView = () => {
  return (
    <AppView>
      <Grid2 container justifyContent="center" alignItems='center'>
        <Stack spacing={2}  justifyContent="center" alignItems='center'>
          <Box
            component="img"
            src="https://auto1-homepage.prod.mp.auto1.cloud/2.36.0-53/images/logo.svg"
            alt="Auto1.com logo"
            maxWidth={138}
          />
          <Typography component="h2" variant="h2">404 - Not Found</Typography>
          <Typography component="p" variant="body2">Sorry, the page you are looking for does not exist.</Typography>
          <Typography component="p"  variant="body2">
            You can always go back to the <RouterLink to="/">homepage</RouterLink>.
          </Typography>
        </Stack>
      </Grid2>
    </AppView>
  );
};

export default NotFoundView;
