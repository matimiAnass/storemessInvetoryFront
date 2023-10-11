import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getRoles = createAsyncThunk('roles/getRoles', async () => {
  const response = await axios.get('/api/roles');
  const data = await response.data;

  return data;
});

export const removeRoles =
  createAsyncThunk('roles', async (roleIds, { dispatch, getState }) => {
  await axios.delete('/api/roles', { data: roleIds });

  return roleIds;
});

const rolesAdapter = createEntityAdapter({});

export const { selectAll: selectRoles, selectById: selectRolesById } = rolesAdapter.getSelectors(
  (state) => state.rolesApp.roles
);

const rolesSlice = createSlice({
  name: 'roles',
  initialState: rolesAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setRolesSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getRoles.fulfilled]: rolesAdapter.setAll,
    [removeRoles.fulfilled]: (state, action) => rolesAdapter.removeMany(state, action.payload),
  },
});

export const { setRolesSearchText } = rolesSlice.actions;

export const selectRolesSearchText = ({ rolesApp }) => rolesApp.roles.searchText;

export default rolesSlice.reducer;
