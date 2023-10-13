import { combineReducers } from '@reduxjs/toolkit';
import contractTypes from './contractTypesSlice';
import contractType from './contractTypeSlice';

const reducer = combineReducers({
  contractTypes,
  contractType,
});

export default reducer;
