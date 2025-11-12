import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';

export const getInvoice = createAsyncThunk('invoice/getInvoice', async (invoiceId) => {
  const response = await axios.get(`/api/invoice/${invoiceId}`);
  const data = await response.data;

  return data === undefined ? null : data;
});

export const removeInvoice = createAsyncThunk(
  '/removeInvoice',
  async (val, { dispatch, getState }) => {
    const { id } = getState().invoiceApp.lead;
    await axios.delete(`/api/invoice/${id}`);
    return id;
  }
);

export const saveInvoice = createAsyncThunk(
  'invoiceApp/invoice',
  async (invoiceData, { dispatch, getState }) => {
    const { id } = getState().invoiceApp;

    const response = await axios.put(`/api/invoice/${id}`, invoiceData);

    const data = await response.data;

    return data;
  }
);

const invoiceSlice = createSlice({
  name: 'invoiceApp/invoice',
  initialState: null,
  reducers: {
    resetInvoice: () => null,
    newInvoice: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {
          id: FuseUtils.generateGUID(),
          name: '',
          account: '',
          status: '',
          created_at: '',
          amount: '',
          assign_user: '',
          active: true,
        },
      }),
    },
  },
  extraReducers: {
    [getInvoice.fulfilled]: (state, action) => action.payload,
    [saveInvoice.fulfilled]: (state, action) => action.payload,
    [removeInvoice.fulfilled]: (state, action) => null,
  },
});

export const { newInvoice, resetInvoice } = invoiceSlice.actions;

export const selectInvoice = ({ invoiceApp }) => invoiceApp.invoice;

export default invoiceSlice.reducer;
