import { lazy } from 'react';

const ContractsDashboardApp = lazy(() => import('./ContractsDashboardApp'));

const ContractsDashboardAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/analytics/contracts',
      element: <ContractsDashboardApp />,
    },
  ],
};

export default ContractsDashboardAppConfig;
