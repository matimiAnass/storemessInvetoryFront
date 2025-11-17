import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';

export const getRole = createAsyncThunk('role/getRole', async (roleId) => {
  const response = await axios.get(`/api/roles/${roleId}`);
  const data = await response.data;

  return data === undefined ? null : data;
});

export const removeRole = createAsyncThunk('/removeRole', async (val, { dispatch, getState }) => {
  const { id } = getState().roleApp.role;
  await axios.delete(`/api/roles/${id}`);
  return id;
});

export const saveRole = createAsyncThunk(
  'roleApp/role',
  async (roleData, { dispatch, getState }) => {
    const { id } = getState().roleApp;

    const response = await axios.put(`/api/roles/${id}`, roleData);

    const data = await response.data;

    return data;
  }
);

const roleSlice = createSlice({
  name: 'roleApp/role',
  initialState: null,
  reducers: {
    resetRole: () => null,
    newRole: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {
          id: FuseUtils.generateGUID(),
          role: '',
          permissions: '',
          active: true,
        },
      }),
    },
  },
  extraReducers: {
    [getRole.fulfilled]: (state, action) => action.payload,
    [saveRole.fulfilled]: (state, action) => action.payload,
    [removeRole.fulfilled]: (state, action) => null,
  },
});

export const { newRole, resetRole } = roleSlice.actions;

export const selectRole = ({ roleApp }) => roleApp.role;

export default roleSlice.reducer;
