import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUsers = createAsyncThunk('users/getUsers', async () => {
  const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL_API}users/`);
  const data = await response.data;
  return data;
});

export const removeUsers = createAsyncThunk('users', async (userIds, { dispatch, getState }) => {
  await axios.delete('/api/users', { data: userIds });

  return userIds;
});

const usersAdapter = createEntityAdapter({});

export const { selectAll: selectUsers, selectById: selectUsersById } = usersAdapter.getSelectors(
  (state) => state.usersApp.users
);

const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setUsersSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getUsers.fulfilled]: usersAdapter.setAll,
    [removeUsers.fulfilled]: (state, action) => usersAdapter.removeMany(state, action.payload),
  },
});

export const { setUsersSearchText } = usersSlice.actions;

export const selectUsersSearchText = ({ usersApp }) => usersApp.users.searchText;

export default usersSlice.reducer;
