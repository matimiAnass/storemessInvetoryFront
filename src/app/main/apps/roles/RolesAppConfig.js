import { lazy } from 'react';
import Role from './role/role';

const Roles = lazy(() => import('./roles/Roles'));

const RolesAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/roles',
      element: <Roles />,
    },
    {
      path: 'apps/roles/:roleId/*',
      element: <Role />,
    },
  ],
};

export default RolesAppConfig;
