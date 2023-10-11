import { lazy } from 'react';
import SaleOrder from './saleOrder/saleOrder';

const SalesOrders = lazy(() => import('./salesOrders/SalesOrders'));

const SalesOrdersAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/salesOrders',
      element: <SalesOrders />,
    },
    {
      path: 'apps/salesOrders/:saleOrderId/*',
      element: <SaleOrder />,
    },

  ],
};
export default SalesOrdersAppConfig;
