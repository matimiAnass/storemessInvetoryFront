import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';

export const getLead = createAsyncThunk(
  'lead/getLead',
  async (leadId) => {
    const response = await axios.get(`/api/leads/${leadId}`);
    const data = await response.data;

    return data === undefined ? null : data;
  });

export const removeLead = createAsyncThunk(
  '/removeLead',
  async (val, { dispatch, getState }) => {
    const { id } = getState().leadApp.lead;
    await axios.delete(`/api/lead/${id}`);
    return id;
  },
);

export const saveLead = createAsyncThunk(
  'leadApp/lead',
  async (leadData, { dispatch, getState }) => {
    const { id } = getState().leadApp;

    const response = await axios.put(`/api/lead/${id}`, leadData);

    const data = await response.data;

    return data;
  },
);

const leadSlice = createSlice({
  name: 'leadApp/lead',
  initialState: null,
  reducers: {
    resetLead: () => null,
    newLead: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {
          id: FuseUtils.generateGUID(),
          name: '',
          account: '',
          email: '',
          phone: '',
          assign_user: '',
          active: true,
        },
      }),
    },
  },
  extraReducers: {
    [getLead.fulfilled]: (state, action) => action.payload,
    [saveLead.fulfilled]: (state, action) => action.payload,
    [removeLead.fulfilled]: (state, action) => null,
  },
});

export const { newLead, resetLead } = leadSlice.actions;

export const selectLead = ({ leadApp }) => leadApp.lead;

export default leadSlice.reducer;
