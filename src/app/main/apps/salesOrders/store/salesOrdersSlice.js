import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getSalesOrders = createAsyncThunk('salesOrders/getSalesOrders', async () => {
  const response = await axios.get('/api/salesOrders');
  const data = await response.data;

  return data;
});

export const removeSalesOrders = createAsyncThunk(
  'salesOrders',
  async (saleOrderIds, { dispatch, getState }) => {
    await axios.delete('/api/salesOrders', { data: saleOrderIds });

    return saleOrderIds;
  }
);

const salesOrdersAdapter = createEntityAdapter({});

export const { selectAll: selectSalesOrders, selectById: selectSalesOrdersById } =
  salesOrdersAdapter.getSelectors((state) => state.salesOrdersApp.salesOrders);

const salesOrdersSlice = createSlice({
  name: 'salesOrders',
  initialState: salesOrdersAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setSalesOrdersSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getSalesOrders.fulfilled]: salesOrdersAdapter.setAll,
    [removeSalesOrders.fulfilled]: (state, action) =>
      salesOrdersAdapter.removeMany(state, action.payload),
  },
});

export const { setSalesOrdersSearchText } = salesOrdersSlice.actions;

export const selectSalesOrdersSearchText = ({ SalesOrdersApp }) =>
  SalesOrdersApp?.salesOrders?.searchText;

export default salesOrdersSlice.reducer;
