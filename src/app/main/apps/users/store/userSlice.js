import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUser = createAsyncThunk('user/getUser', async (userId) => {
  const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL_API}users/${userId}`);
  const data = await response.data;
  return data;
});
export const getListRoles = createAsyncThunk('user/getListRoles', async () => {
  const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL_API}roles/`);
  const data = await response.data;
  const list_roles = [];
  for (const element of data) {
    list_roles.push(element.name);
  }
  return list_roles;
});

export const removeUser = createAsyncThunk(
  'user/removeUser',
  async (val, { dispatch, getState }) => {
    const id = getState().userApp?.user?.user.id;
    await axios.delete(`${process.env.REACT_APP_BACKEND_URL_API}user/${id}`);
    return id;
  }
);
export const saveUser = createAsyncThunk(
  'user/saveUser',
  async (userData, { dispatch, getState }) => {
    let response = {};
    if (getState().userApp?.user?.user === undefined) {
      response = await axios.post(`${process.env.REACT_APP_BACKEND_URL_API}user/`, userData);
    } else {
      const id = getState().userApp?.user?.user.id;
      response = await axios.put(`${process.env.REACT_APP_BACKEND_URL_API}user/${id}`, userData);
    }

    const data = await response.data;

    return data;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: { userUpdated: {}, user: null, roles: null },
  reducers: {
    setUserUpdated: (state, action) => {
      state.userUpdated = action.payload;
    },
    resetUser: () => {},
    newUser: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {
          id: 0,
          avatar: '',
          username: '',
          name: '',
          email: '',
          type: '',
          status: 0,
          active: true,
        },
      }),
    },
  },
  extraReducers: {
    [getListRoles.fulfilled]: (state, action) => {
      state.roles = action.payload;
    },
    [getUser.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
    [saveUser.fulfilled]: (state, action) => action.payload,
    [removeUser.fulfilled]: (state, action) => null,
  },
});

export const { newUser, setUserUpdated, resetUser } = userSlice.actions;

export const selectUser = ({ userApp }) => userApp?.user;
export default userSlice.reducer;
