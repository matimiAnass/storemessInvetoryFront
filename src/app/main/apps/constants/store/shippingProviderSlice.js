import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';

export const getShippingProvider = createAsyncThunk(
  'shippingProvider/getShippingProviders',
  async (shippingProviderId) => {
    const response = await axios.get(`/api/shippingProviders/${shippingProviderId}`);
    const data = await response.data;

    return data === undefined ? null : data;
  });

export const removeShippingProvider = createAsyncThunk(
  '/removeShippingProvider',
  async (val, { dispatch, getState }) => {
    const { id } = getState().constantApp.shippingProvider;
    await axios.delete(`/api/shippingProvider/${id}`);
    return id;
  },
);

export const saveShippingProvider = createAsyncThunk(
  'constantApp/ShippingProvider',
  async (shippingProviderData, { dispatch, getState }) => {
    const { id } = getState().constantApp;

    const response = await axios.put(`/api/shippingProvider/${id}`, shippingProviderData);

    const data = await response.data;

    return data;
  },
);

const shippingProviderSlice = createSlice({
  name: 'constantsApp/shippingProvider',
  initialState: null,
  reducers: {
    resetShippingProvider: () => null,
    newShippingProvider: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {
          id: FuseUtils.generateGUID(),
          contract_type: '',
          active: true,
        },
      }),
    },
  },
  extraReducers: {
    [getShippingProvider.fulfilled]: (state, action) => action.payload,
    [saveShippingProvider.fulfilled]: (state, action) => action.payload,
    [removeShippingProvider.fulfilled]: (state, action) => null,
  },
});

export const { newShippingProvider, resetShippingProvider } = shippingProviderSlice.actions;

export const selectShippingProvider = ({ constantApp }) => constantApp.shippingProvider;

export default shippingProviderSlice.reducer;
