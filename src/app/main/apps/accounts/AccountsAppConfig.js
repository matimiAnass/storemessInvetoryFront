import { lazy } from 'react';
import Account from './account/account';

const Accounts = lazy(() => import('./accounts/Accounts'));

const AccountsAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/accounts',
      element: <Accounts />,
    },
    {
      path: 'apps/accounts/:accountId/*',
      element: <Account />,
    },

  ],
};

export default AccountsAppConfig;
