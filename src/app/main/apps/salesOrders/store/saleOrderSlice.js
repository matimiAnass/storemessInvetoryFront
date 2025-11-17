import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';

export const getSaleOrder = createAsyncThunk('saleOrder/getSaleOrder', async (saleOrderId) => {
  const response = await axios.get(`/api/saleOrder/${saleOrderId}`);
  const data = await response.data;

  return data === undefined ? null : data;
});

export const removeSaleOrder = createAsyncThunk(
  '/removeSaleOrder',
  async (val, { dispatch, getState }) => {
    const { id } = getState().saleOrderApp.lead;
    await axios.delete(`/api/saleOrder/${id}`);
    return id;
  }
);

export const saveSaleOrder = createAsyncThunk(
  'saleOrderApp/saleOrder',
  async (saleOrderData, { dispatch, getState }) => {
    const { id } = getState().saleOrderApp;

    const response = await axios.put(`/api/saleOrder/${id}`, saleOrderData);

    const data = await response.data;

    return data;
  }
);

const saleOrderSlice = createSlice({
  name: 'saleOrderApp/saleOrder',
  initialState: null,
  reducers: {
    resetSaleOrder: () => null,
    newSaleOrder: {
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
    [getSaleOrder.fulfilled]: (state, action) => action.payload,
    [saveSaleOrder.fulfilled]: (state, action) => action.payload,
    [removeSaleOrder.fulfilled]: (state, action) => null,
  },
});

export const { newSaleOrder, resetSaleOrder } = saleOrderSlice.actions;

export const selectSaleOrder = ({ saleOrderApp }) => saleOrderApp.saleOrder;

export default saleOrderSlice.reducer;
