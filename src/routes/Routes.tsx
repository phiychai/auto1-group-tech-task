import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import DEFAULT_ROUTES from './DefaultRoutes';

const routesDefault = createBrowserRouter(DEFAULT_ROUTES);


const Routes = () => {
  return <RouterProvider router={routesDefault} />;
};
export default Routes;
