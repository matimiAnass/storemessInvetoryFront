import { lazy } from 'react';
import Invoice from './invoice/invoice';

const Invoices = lazy(() => import('./invoices/Invoices'));

const InvoicesAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/invoices',
      element: <Invoices />,
    },
    {
      path: 'apps/invoices/:invoiceId/*',
      element: <Invoice />,
    },

  ],
};
export default InvoicesAppConfig;
