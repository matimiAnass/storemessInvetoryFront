import { lazy } from 'react';

const ContractsShowApp = lazy(() => import('./ContractsShowApp'));

const ContractsShowAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'apps/contracts/contractsDetails/:roleId/*',
      element: <ContractsShowApp />,
      children: [
        {
          path: ':filter',
          element: <ContractsShowApp />,
          children: [
            {
              path: ':id',
              element: <ContractsShowApp />,
            },
          ],
        },
      ],
    },
  ],
};

export default ContractsShowAppConfig;
