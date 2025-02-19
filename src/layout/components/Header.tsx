import { FunctionComponent } from 'react';
import { AppBar, Toolbar, Typography, Box, List, ListItem, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Header: FunctionComponent = () => {
  return (
    <AppBar
      component="div"
      sx={{
        boxShadow: 'none',
        flexGrow: 1,
        height: 80,
        backgroundColor: 'white',
        borderBottom: '1px solid #F1F1F1',
        flexDirection: 'row',
      }}
    >
      <Toolbar
        disableGutters
        sx={{ paddingX: 1, maxWidth: '1197px', justifyContent: 'space-between', margin: '0 auto', width: '100%' }}
      >
        <Box>
          <Typography variant="h1" className="sr-only">
            AUTO1.com
          </Typography>
          <RouterLink to="/">
            <Box
              component="img"
              src="https://auto1-homepage.prod.mp.auto1.cloud/2.36.0-53/images/logo.svg"
              alt="AUTO1.com logo"
            />
          </RouterLink>
        </Box>
        <Box>
          <List sx={{ display: 'flex', flexDirection: 'row', padding: 0 }}>
            {['Purchase', 'My Orders', 'Sell'].map((text) => (
              <ListItem key={text} sx={{ width: 'auto', padding: 0 }}>
                <Link
                  href="#"
                  color="#4A4A4A"

                  sx={{
                    fontSize: '14px',
                    fontWeight: '400',
                    padding: '8px 16px',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                      textDecoration: 'none',
                    },
                  }}
                >
                  {text}
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
