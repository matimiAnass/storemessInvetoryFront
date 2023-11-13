import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';

export const getContract = createAsyncThunk('user/getContract', async (contractId) => {
  const response = await axios.get(`/api/accounts/${contractId}`);
  const data = await response.data;

  return data === undefined ? null : data;
});

export const removeContract = createAsyncThunk(
  'account/removeContract',
  async (val, { dispatch, getState }) => {
    const { id } = getState().contractsApp.contract;
    await axios.delete(`/api/contracts/${id}`);
    return id;
  }
);
export const saveContract = createAsyncThunk(
  'account/saveContract',
  async (contractData, { dispatch, getState }) => {
    const { id } = getState().contractsApp;

    const response = await axios.put(`/api/contracts/${id}`, contractData);

    const data = await response.data;

    return data;
  }
);

const contractSlice = createSlice({
  name: 'contract',
  initialState: null,
  reducers: {
    resetContract: () => null,
    newContract: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {
          id: FuseUtils.generateGUID(),
          name: '',
          client_name: '',
          value: '',
          type: '',
          start_date: '',
          end_date: '',
          status: '',
          active: true,
        },
      }),
    },
  },
  extraReducers: {
    [getContract.fulfilled]: (state, action) => action.payload,
    [saveContract.fulfilled]: (state, action) => action.payload,
    [removeContract.fulfilled]: (state, action) => null,
  },
});

export const { newContract, resetContract } = contractSlice.actions;

export const selectContract = ({ contractApp }) => contractApp.contract;

export default contractSlice.reducer;
