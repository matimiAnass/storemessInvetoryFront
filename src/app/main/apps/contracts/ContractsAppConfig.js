import { lazy } from 'react';
import Contract from './contract/contract';

const Contracts = lazy(() => import('./contracts/Contracts'));

const ContractsAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/contracts',
      element: <Contracts />,
    },
    {
      path: 'apps/contracts/:contractId/*',
      element: <Contract />,
    },

  ],
};

export default ContractsAppConfig;
