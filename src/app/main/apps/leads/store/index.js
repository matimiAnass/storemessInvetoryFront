import { combineReducers } from '@reduxjs/toolkit';
import leads from './leadsSlice';
import lead from './leadSlice';

const reducer = combineReducers({
  leads,
  lead,
});

export default reducer;
