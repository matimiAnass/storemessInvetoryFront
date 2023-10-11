import { combineReducers } from '@reduxjs/toolkit';
import accounts from './accountsSlice';
import account from './accountSlice';

const reducer = combineReducers({
  accounts,
  account,
});

export default reducer;
