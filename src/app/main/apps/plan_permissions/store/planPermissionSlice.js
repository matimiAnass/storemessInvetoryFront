import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getPlanPermission = createAsyncThunk(
  'planPermission/getPlanPermission',
  async (planPermissionId) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL_API}/plan_permission/${planPermissionId}`
    );
    const data = await response.data;
    return data;
  }
);

export const removePlanPermission = createAsyncThunk(
  '/removePlanPermission',
  async (val, { dispatch, getState }) => {
    const id = getState().planPermissionApp.planPermission.plan?.id;
    await axios.delete(`${process.env.REACT_APP_BACKEND_URL_API}/plan_permission/${id}`);
    return id;
  }
);

export const savePlanPermission = createAsyncThunk(
  'planPermissionApp/planPermission',
  async (planPermissionData, { dispatch, getState }) => {
    const id = getState().planPermissionApp.planPermission.plan?.id;
    let response = {};
    if (id === undefined) {
      response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL_API}/plan_permission/`,
        planPermissionData
      );
    } else {
      response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL_API}/plan_permission/${id}`,
        planPermissionData
      );
    }
    const data = await response.data;

    return data;
  }
);

const planPermissionSlice = createSlice({
  name: 'planPermissionApp',
  initialState: null /* {dataUpdated:{},}, */ /* {
      plan: {},
      permissions: {},
  // }, */,
  reducers: {
    setDataUpdated: (state, action) => {
      state.dataUpdated = action.payload;
    },
    resetPlanPermission: () => null,
    newPlanPermission: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {
          // id: FuseUtils.generateGUID(),
          name: '',
          permissions: [],
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

export const { newPlanPermission, setDataUpdated, resetPlanPermission } =
  planPermissionSlice.actions;

export const selectPlanPermission = ({ planPermissionApp }) => planPermissionApp.planPermission;
export const getDataUpdated = ({ planPermissionApp }) => planPermissionApp.planPermission;

export default planPermissionSlice.reducer;
