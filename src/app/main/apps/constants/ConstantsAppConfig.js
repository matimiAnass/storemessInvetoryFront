import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

import ContractType from './contractTypes/contractType/contractType';

const ContractTypes = lazy(() => import('./contractTypes/contractTypes/ContractTypes'));

const ConstantsAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/constants/contractTypes',
      element: <ContractTypes />,
    },
    {
      path: 'apps/constants/contractTypes/:contractTypeId/*',
      element: <ContractType />,
    },

  ],
};

export default ConstantsAppConfig;
