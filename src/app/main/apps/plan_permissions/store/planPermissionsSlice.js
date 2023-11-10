import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getPlanPermissions = createAsyncThunk('planPermissions/getPlanPermissions', async () => {
  const response = await axios.get('http://192.168.1.17:8000/api/permissions');
  const data = await response.data;
  return data;
});

export const removePlanPermissions =
  createAsyncThunk('planPermissions', async (planPermissionIds, { dispatch, getState }) => {
  await axios.delete('/api/planPermissions', { data: planPermissionIds });

  return planPermissionIds;
});

const planPermissionsAdapter = createEntityAdapter({});

export const { selectAll: selectPlanPermissions, selectById: selectPlanPermissionsById } = planPermissionsAdapter.getSelectors(
  (state) => state.planPermissionsApp.planPermissions
);

const planPermissionsSlice = createSlice({
  name: 'planPermissions',
  initialState: planPermissionsAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setPlanPermissionsSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getPlanPermissions.fulfilled]: planPermissionsAdapter.setAll,
    [removePlanPermissions.fulfilled]: (state, action) => planPermissionsAdapter.removeMany(state, action.payload),
  },
});

export const { setPlanPermissionsSearchText } = planPermissionsSlice.actions;

export const selectPlanPermissionsSearchText = ({ planPermissionsApp }) => planPermissionsApp.planPermissions.searchText;

export default planPermissionsSlice.reducer;
