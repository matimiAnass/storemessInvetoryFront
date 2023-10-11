import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';

export const getUser = createAsyncThunk('user/getUser', async (userId) => {
  const response = await axios.get(`/api/users/${userId}`);
  const data = await response.data;

  return data === undefined ? null : data;
});

export const removeUser = createAsyncThunk(
  'user/removeUser',
  async (val, { dispatch, getState }) => {
    const { id } = getState().usersApp.user;
    await axios.delete(`/api/users/${id}`);
    return id;
  }
);
export const saveUser = createAsyncThunk(
  'user/saveUser',
  async (userData, { dispatch, getState }) => {
    const { id } = getState().usersApp;

    const response = await axios.put(`/api/users/${id}`, userData);

    const data = await response.data;

    return data;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    resetUser: () => null,
    newUser: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {
          id: FuseUtils.generateGUID(),
          avatar: '',
          username: '',
          name: '',
          email: '',
          type: '',
          status: '',
          active: true,
        },
      }),
    },
  },
  extraReducers: {
    [getUser.fulfilled]: (state, action) => action.payload,
    [saveUser.fulfilled]: (state, action) => action.payload,
    [removeUser.fulfilled]: (state, action) => null,
  },
});

export const { newUser, resetUser } = userSlice.actions;

export const selectUser = ({ usersApp }) => usersApp.user;

export default userSlice.reducer;
