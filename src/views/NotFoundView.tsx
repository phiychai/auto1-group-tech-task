import { Typography } from '@mui/material';
import { AppLink, AppView } from '@/components';

const NotFoundView = () => {
  return (
    <AppView>
      <Typography variant="h3" component="h1">
       404 - Not Found
      </Typography>
      <Typography variant="body1">
         Sorry, the page you are looking for does not exist. You can always go back to the{' '}
        <AppLink to="/">homepage</AppLink>.
      </Typography>
    </AppView>
  );
};

export default NotFoundView;
