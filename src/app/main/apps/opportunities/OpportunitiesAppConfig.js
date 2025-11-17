import { lazy } from 'react';
import Opportunitie from './opportunitie/opportunitie';

const Opportunities = lazy(() => import('./opportunities/Opportunities'));

const OpportunitiesAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/opportunities',
      element: <Opportunities />,
    },
    {
      path: 'apps/opportunities/:opportunitieId/*',
      element: <Opportunitie />,
    },
  ],
};

export default OpportunitiesAppConfig;
