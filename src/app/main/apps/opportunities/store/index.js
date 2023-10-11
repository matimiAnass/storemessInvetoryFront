import { combineReducers } from '@reduxjs/toolkit';
import opportunities from './opportunitiesSlice';
import opportunitie from './opportunitieSlice';

const reducer = combineReducers({
  opportunities,
  opportunitie,
});

export default reducer;
