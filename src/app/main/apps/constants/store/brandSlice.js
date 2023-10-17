import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';

export const getBrand = createAsyncThunk(
  'brand/getBrands',
  async (brandId) => {
    const response = await axios.get(`/api/constants/products/brands/${brandId}`);
    const data = await response.data;

    return data === undefined ? null : data;
  });

export const removeBrand = createAsyncThunk(
  '/removeBrand',
  async (val, { dispatch, getState }) => {
    const { id } = getState().constantApp.Brand;
    await axios.delete(`/api/constants/products/brand/${id}`);
    return id;
  },
);

export const saveBrand = createAsyncThunk(
  'constantApp/products/brand',
  async (brandData, { dispatch, getState }) => {
    const { id } = getState().constantApp;

    const response = await axios.put(`/api/brand/${id}`, brandData);

    const data = await response.data;

    return data;
  },
);

const brandSlice = createSlice({
  name: 'constantsApp/products/brand',
  initialState: null,
  reducers: {
    resetBrand: () => null,
    newBrand: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {
          id: FuseUtils.generateGUID(),
          brand: '',
          active: true,
        },
      }),
    },
  },
  extraReducers: {
    [getBrand.fulfilled]: (state, action) => action.payload,
    [saveBrand.fulfilled]: (state, action) => action.payload,
    [removeBrand.fulfilled]: (state, action) => null,
  },
});
``
export const { newBrand, resetBrand } = brandSlice.actions;

export const selectBrand = ({ constantApp }) => constantApp.brand;

export default brandSlice.reducer;
