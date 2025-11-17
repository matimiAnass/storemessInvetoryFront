import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';

export const getOpportunitie = createAsyncThunk(
  'opportunitie/getOpportunitie',
  async (opportunitieId) => {
    const response = await axios.get(`/api/opportunities/${opportunitieId}`);
    const data = await response.data;

    return data === undefined ? null : data;
  }
);

export const removeOpportunitie = createAsyncThunk(
  '/removeOpportunitie',
  async (val, { dispatch, getState }) => {
    const { id } = getState().opportunitieApp.opportunitie;
    await axios.delete(`/api/opportunities/${id}`);
    return id;
  }
);

export const saveOpportunitie = createAsyncThunk(
  'opportunitieApp/opportunitie',
  async (opportunitieData, { dispatch, getState }) => {
    const { id } = getState().opportunitieApp;

    const response = await axios.put(`/api/opportunities/${id}`, opportunitieData);

    const data = await response.data;

    return data;
  }
);

const opportunitieSlice = createSlice({
  name: 'opportunitieApp/opportunitie',
  initialState: null,
  reducers: {
    resetOpportunitie: () => null,
    newOpportunitie: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {
          id: FuseUtils.generateGUID(),
          name: '',
          account: '',
          stage: '',
          amount: '',
          asignedUser: '',
          active: true,
        },
      }),
    },
  },
  extraReducers: {
    [getOpportunitie.fulfilled]: (state, action) => action.payload,
    [saveOpportunitie.fulfilled]: (state, action) => action.payload,
    [removeOpportunitie.fulfilled]: (state, action) => null,
  },
});

export const { newOpportunitie, resetOpportunitie } = opportunitieSlice.actions;

export const selectOpportunitie = ({ opportunitieApp }) => opportunitieApp.opportunitie;

export default opportunitieSlice.reducer;
