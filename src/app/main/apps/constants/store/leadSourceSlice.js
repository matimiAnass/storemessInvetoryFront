import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';

export const getLeadSource = createAsyncThunk(
  'LeadSource/getLeadSources',
  async (LeadSourceId) => {
    const response = await axios.get(`/api/leadSources/${leadSourceId}`);
    const data = await response.data;

    return data === undefined ? null : data;
  });

export const removeLeadSource = createAsyncThunk(
  '/removeLeadSource',
  async (val, { dispatch, getState }) => {
    const { id } = getState().constantApp.leadSource;
    await axios.delete(`/api/leadSource/${id}`);
    return id;
  },
);

export const saveLeadSource = createAsyncThunk(
  'constantApp/leadSource',
  async (leadSourceData, { dispatch, getState }) => {
    const { id } = getState().constantApp;

    const response = await axios.put(`/api/leadSource/${id}`, leadSourceData);

    const data = await response.data;

    return data;
  },
);

const leadSourceSlice = createSlice({
  name: 'constantsApp/leadSource',
  initialState: null,
  reducers: {
    resetLeadSource: () => null,
    newLeadSource: {
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
    [getLeadSource.fulfilled]: (state, action) => action.payload,
    [saveLeadSource.fulfilled]: (state, action) => action.payload,
    [removeLeadSource.fulfilled]: (state, action) => null,
  },
});

export const { newLeadSource, resetLeadSource } = leadSourceSlice.actions;

export const selectLeadSource = ({ constantApp }) => constantApp.leadSource;

export default leadSourceSlice.reducer;
