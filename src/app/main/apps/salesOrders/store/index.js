import { combineReducers } from '@reduxjs/toolkit';
import salesOrders from './salesOrdersSlice';
import saleOrder from './saleOrderSlice';

const reducer = combineReducers({
  salesOrders,
  saleOrder,
});

export default reducer;
