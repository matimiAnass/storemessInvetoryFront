import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';

export const getPlanPermission = createAsyncThunk('planPermission/getPlanPermission', async (planPermissionId) => {
  const response = await axios.get(`/api/planPermissions/${planPermissionId}`);
  const data = await response.data;

  return data === undefined ? null : data;
});

export const removePlanPermission = createAsyncThunk(
  '/removePlanPermission',
  async (val, { dispatch, getState }) => {
    const { id } = getState().planPermissionApp.planPermission;
    await axios.delete(`/api/planPermissions/${id}`);
    return id;
  },
);

export const savePlanPermission = createAsyncThunk(
  'planPermissionApp/planPermission',
  async (planPermissionData, { dispatch, getState }) => {
    const { id } = getState().planPermissionApp;

    const response = await axios.put(`/api/planPermissions/${id}`, planPermissionData);

    const data = await response.data;

    return data;
  },
);

const planPermissionSlice = createSlice({
  name: 'planPermissionApp/planPermission',
  initialState: null,
  reducers: {
    resetPlanPermission: () => null,
    newPlanPermission: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {
          id: FuseUtils.generateGUID(),
          planPermission: '',
          permissions: '',
          active: true,
        },
      }),
    },
  },
  extraReducers: {
    [getPlanPermission.fulfilled]: (state, action) => action.payload,
    [savePlanPermission.fulfilled]: (state, action) => action.payload,
    [removePlanPermission.fulfilled]: (state, action) => null,
  },
});

export const { newPlanPermission, resetPlanPermission } = planPermissionSlice.actions;

export const selectPlanPermission = ({ planPermissionApp }) => planPermissionApp.planPermission;

export default planPermissionSlice.reducer;
