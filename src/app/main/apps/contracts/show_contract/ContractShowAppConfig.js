import { lazy } from 'react';

const ContractShowApp = lazy(() => import('./ContractShowApp'));

const ContractShowAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'apps/contracts/contractsDetails/:contractId/*',
      element: <ContractShowApp />,
      children: [
        {
          path: ':filter',
          element: <ContractShowApp />,
          children: [
            {
              path: ':id',
              element: <ContractShowApp />,
            },
          ],
        },
      ],
    },
  ],
};

export default ContractShowAppConfig;
