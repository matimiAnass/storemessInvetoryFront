import { combineReducers } from '@reduxjs/toolkit';
import roles from './rolesSlice';
import role from './roleSlice';

const reducer = combineReducers({
  roles,
  role,
});

export default reducer;
