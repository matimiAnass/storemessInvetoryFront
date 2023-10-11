import { lazy } from 'react';
import Lead from './lead/lead';

const Leads = lazy(() => import('./leads/Leads'));

const LeadsAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/leads',
      element: <Leads />,
    },
    {
      path: 'apps/leads/:leadId/*',
      element: <Lead />,
    },

  ],
};
export default LeadsAppConfig;
