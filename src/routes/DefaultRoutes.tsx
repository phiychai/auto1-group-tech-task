
import { PrivateLayout } from '@/layout';
import { NotFoundView } from '@/views';
import HomeView from '@/views/Home';

const PRIVATE_ROUTES = [
  {
    element: <PrivateLayout />,
    children: [
      {
        path: '*',
        element: <NotFoundView />,
      },
      {
        path: '/',
        element: <HomeView />,
      },
    ],
  },
];

export default PRIVATE_ROUTES;
