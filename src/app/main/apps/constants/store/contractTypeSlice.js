import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';

export const getContractType = createAsyncThunk(
  'contractType/getContractTypes',
  async (contractTypeId) => {
    const response = await axios.get(`/api/contractTypes/${contractTypeId}`);
    const data = await response.data;

    return data === undefined ? null : data;
  });

export const removeContractType = createAsyncThunk(
  '/removeContractType',
  async (val, { dispatch, getState }) => {
    const { id } = getState().constantApp.contractType;
    await axios.delete(`/api/contractType/${id}`);
    return id;
  },
);

export const saveContractType = createAsyncThunk(
  'constantApp/contractType',
  async (contractTypeData, { dispatch, getState }) => {
    const { id } = getState().constantApp;

    const response = await axios.put(`/api/contractType/${id}`, contractTypeData);

    const data = await response.data;

    return data;
  },
);

const contractTypeSlice = createSlice({
  name: 'constantsApp/contractType',
  initialState: null,
  reducers: {
    resetContractType: () => null,
    newContractType: {
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
    [getContractType.fulfilled]: (state, action) => action.payload,
    [saveContractType.fulfilled]: (state, action) => action.payload,
    [removeContractType.fulfilled]: (state, action) => null,
  },
});

export const { newContractType, resetContractType } = contractTypeSlice.actions;

export const selectContractType = ({ constantApp }) => constantApp.contractType;

export default contractTypeSlice.reducer;
