import { combineReducers } from '@reduxjs/toolkit';
import contracts from './contractsSlice';
import contract from './contractSlice';

const reducer = combineReducers({
  contracts,
  contract,
});

export default reducer;
