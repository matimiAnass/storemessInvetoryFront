import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getInvoices = createAsyncThunk('invoices/getInvoices', async () => {
  const response = await axios.get('/api/invoices');
  const data = await response.data;

  return data;
});

export const removeInvoices = createAsyncThunk(
  'invoices',
  async (invoiceIds, { dispatch, getState }) => {
    await axios.delete('/api/invoices', { data: invoiceIds });

    return invoiceIds;
  }
);

const invoicesAdapter = createEntityAdapter({});

export const { selectAll: selectInvoices, selectById: selectInvoicesById } =
  invoicesAdapter.getSelectors((state) => state.invoicesApp.invoices);

const invoicesSlice = createSlice({
  name: 'invoices',
  initialState: invoicesAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setInvoicesSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getInvoices.fulfilled]: invoicesAdapter.setAll,
    [removeInvoices.fulfilled]: (state, action) =>
      invoicesAdapter.removeMany(state, action.payload),
  },
});

export const { setInvoicesSearchText } = invoicesSlice.actions;

export const selectInvoicesSearchText = ({ InvoicesApp }) => InvoicesApp?.invoices?.searchText;

export default invoicesSlice.reducer;
