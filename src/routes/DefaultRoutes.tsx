
import { DefaultLayout } from '@/layout';
import { NotFoundView } from '@/views';
import HomeView from '@/views/Home';

const DEFAULT_ROUTES = [
  {
    element: <DefaultLayout />,
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

export default DEFAULT_ROUTES;
