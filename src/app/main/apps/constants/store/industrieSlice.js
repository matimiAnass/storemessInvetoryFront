import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';

export const getIndustrie = createAsyncThunk(
  'industrie/getIndustries',
  async (industrieId) => {
    const response = await axios.get(`/api/constants/accounts/industries/${industrieId}`);
    const data = await response.data;

    return data === undefined ? null : data;
  });

export const removeIndustrie = createAsyncThunk(
  '/removeIndustrie',
  async (val, { dispatch, getState }) => {
    const { id } = getState().constantApp.industrie;
    await axios.delete(`/api/constants/accounts/industrie/${id}`);
    return id;
  },
);

export const saveIndustrie = createAsyncThunk(
  'constantApp/accounts/industrie',
  async (industrieData, { dispatch, getState }) => {
    const { id } = getState().constantApp;

    const response = await axios.put(`/api/industrie/${id}`, industrieData);

    const data = await response.data;

    return data;
  },
);

const industrieSlice = createSlice({
  name: 'constantsApp/accounts/industrie',
  initialState: null,
  reducers: {
    resetIndustrie: () => null,
    newIndustrie: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {
          id: FuseUtils.generateGUID(),
          industrie: '',
          active: true,
        },
      }),
    },
  },
  extraReducers: {
    [getIndustrie.fulfilled]: (state, action) => action.payload,
    [saveIndustrie.fulfilled]: (state, action) => action.payload,
    [removeIndustrie.fulfilled]: (state, action) => null,
  },
});

export const { newIndustrie, resetIndustrie } = industrieSlice.actions;

export const selectIndustrie = ({ constantApp }) => constantApp.industrie;

export default industrieSlice.reducer;
