import { lazy } from 'react';
import PlanPermission from './plan_permission/planPermission';

const PlanPermissions = lazy(() => import('./plan_permissions/PlanPermissions'));

const PlanPermissionsAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/planPermissions',
      element: <PlanPermissions />,
    },
    {
      path: 'apps/planPermissions/:planPermissionId/*',
      element: <PlanPermission />,
    },
  ],
};

export default PlanPermissionsAppConfig;
