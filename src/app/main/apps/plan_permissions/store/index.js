import { combineReducers } from '@reduxjs/toolkit';
import planPermissions from './planPermissionsSlice';
import planPermission from './planPermissionSlice';

const reducer = combineReducers({
  planPermissions,
  planPermission,
});

export default reducer;
