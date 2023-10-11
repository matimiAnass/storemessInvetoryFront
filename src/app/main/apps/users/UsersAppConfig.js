import { lazy } from 'react';
import User from './user/user';

const Users = lazy(() => import('./users/Users'));

const UsersAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/users',
      element: <Users />,
    },
    {
      path: 'apps/users/:userId/*',
      element: <User />,
    },

  ],
};

export default UsersAppConfig;
