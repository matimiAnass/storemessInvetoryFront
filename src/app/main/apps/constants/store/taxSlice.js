import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';

export const getTax = createAsyncThunk(
  'tax/getTaxs',
  async (taxId) => {
    const response = await axios.get(`/api/constants/products/taxs/${taxId}`);
    const data = await response.data;

    return data === undefined ? null : data;
  });

export const removeTax = createAsyncThunk(
  '/removeTax',
  async (val, { dispatch, getState }) => {
    const { id } = getState().constantApp.tax;
    await axios.delete(`/api/constants/products/tax/${id}`);
    return id;
  },
);

export const saveTax = createAsyncThunk(
  'constantApp/products/tax',
  async (taxData, { dispatch, getState }) => {
    const { id } = getState().constantApp;

    const response = await axios.put(`/api/tax/${id}`, taxData);

    const data = await response.data;

    return data;
  },
);

const taxSlice = createSlice({
  name: 'constantsApp/products/tax',
  initialState: null,
  reducers: {
    resetTax: () => null,
    newTax: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {
          id: FuseUtils.generateGUID(),
          tax: '',
          active: true,
        },
      }),
    },
  },
  extraReducers: {
    [getTax.fulfilled]: (state, action) => action.payload,
    [saveTax.fulfilled]: (state, action) => action.payload,
    [removeTax.fulfilled]: (state, action) => null,
  },
});

export const { newTax, resetTax } = taxSlice.actions;

export const selectTax   = ({ constantApp }) => constantApp.tax;

export default taxSlice.reducer;
