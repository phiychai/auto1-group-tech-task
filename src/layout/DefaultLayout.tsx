import { FunctionComponent, PropsWithChildren } from 'react';
import { Stack, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { ErrorBoundary } from '@/components';
import { Header } from './components';
/**
 * DefaultLayout component that provides a standard layout structure for the application.
 * It includes a header, main content area with error boundary, and a footer.
 *
 * @component
 * @param {PropsWithChildren} props - The props for the component.
 * @param {React.ReactNode} props.children - The child components to be rendered within the main content area.
 * @returns {JSX.Element} A Stack component containing the layout structure with header, main content, and footer.
 */
const DefaultLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <Stack>
      <Stack component="header" minHeight="80px">
        <Header />
      </Stack>
      <Stack
        component="main"
        flexGrow={1}
        justifyContent="space-between"
        paddingLeft={1}
        paddingRight={1}

      >
        <ErrorBoundary name="Content">
          {/* Always Render Router's Outlet*/}
          <Outlet />
          {/* Also render children when it is provided */}
          {children}
        </ErrorBoundary>
      </Stack>
      <Stack
        component="footer"
        height={80}
        display="flex"
        justifyContent="center"
        borderTop="1px solid"
        alignItems="center"
         sx={{ borderColor: 'divider' }}
      >
        {' '}
        <Typography variant="body1">© AUTO1 Group 2018</Typography>{' '}
      </Stack>
    </Stack>
  );
};

export default DefaultLayout;
