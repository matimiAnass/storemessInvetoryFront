import { combineReducers } from '@reduxjs/toolkit';
import invoices from './invoicesSlice';
import invoice from './invoiceSlice';

const reducer = combineReducers({
  invoices,
  invoice,
});

export default reducer;
