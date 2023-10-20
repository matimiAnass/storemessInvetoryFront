/* eslint import/no-extraneous-dependencies: off */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import history from '@history';
import _ from '@lodash';
import { setInitialSettings } from 'app/store/fuse/settingsSlice';
import { showMessage } from 'app/store/fuse/messageSlice';
import settingsConfig from 'app/configs/settingsConfig';
import jwtService from '../auth/services/jwtService';

export const setUser = createAsyncThunk('users/setUser', async (user, { dispatch, getState }) => {
  /*
    You can redirect the logged-in users to a specific route depending on his role
    */
  if (user.loginRedirectUrl) {
    settingsConfig.loginRedirectUrl = user.loginRedirectUrl; // for example '/apps/academy'
  }

  return user;
});

export const updateUserSettings = createAsyncThunk(
  'users/updateSettings',
  async (settings, { dispatch, getState }) => {
    const { user } = getState();
    const newUser = _.merge({}, user, { data: { settings } });

    dispatch(updateUserData(newUser));

    return newUser;
  }
);

export const updateUserShortcuts = createAsyncThunk(
  'users/updateShortucts',
  async (shortcuts, { dispatch, getState }) => {
    const { user } = getState();
    const newUser = {
      ...user,
      data: {
        ...user.data,
        shortcuts,
      },
    };

    dispatch(updateUserData(newUser));

    return newUser;
  }
);

export const logoutUser = () => async (dispatch, getState) => {
  const { user } = getState();

  if (!user.role || user.role.length === 0) {
    // is guest
    return null;
  }

  history.push({
    pathname: '/',
  });

  dispatch(setInitialSettings());

  return dispatch(userLoggedOut());
};

export const updateUserData = (user) => async (dispatch, getState) => {
  if (!user.role || user.role.length === 0) {
    // is guest
    return;
  }

  jwtService
    .updateUserData(user)
    .then(() => {
      dispatch(showMessage({ message: 'User data saved with api' }));
    })
    .catch((error) => {
      dispatch(showMessage({ message: error.message }));
    });
};

const initialState = {
  role: [], // guest
  data: {
    displayName: 'John Doe',
    photoURL: 'assets/images/avatars/brian-hughes.jpg',
    email: 'johndoe@withinpixels.com',
    shortcuts: ['apps.calendar', 'apps.mailbox', 'apps.contacts', 'apps.tasks'],
  },
};
//   user: {
//     id: 1,
//     username: "SuperAdmin",
//     name: "Super Admin",
//     title: null,
//     email: "superadmin@example.com",
//     phone: null,
//     gender: null,
//     type: "super admin",
//     is_active: 1,
//     user_roles: null,
//     lang: "en",
//     mode: "light",
//     avatar: "avatar.png",
//     plan: null,
//     plan_expire_date: null,
//     requested_plan: 0,
//     subscription_id: null,
//     subscription_status: null,
//     subscription_expire_date: null,
//     plan_is_active: 1,
//     created_by: 0,
//     created_at: "2023-09-11T11:25:28.000000Z",
//     updated_at: "2023-09-27T17:31:31.000000Z",
//     active_status: 0,
//     dark_mode: 0,
//     messenger_color: "#2180f3",
//     name_entreprise: "SuperAdmin",
//     type_name: "super admin",
//     user_roles_name: ""

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLoggedOut: (state, action) => initialState,
  },
  extraReducers: {
    [updateUserSettings.fulfilled]: (state, action) => action.payload,
    [updateUserShortcuts.fulfilled]: (state, action) => action.payload,
    [setUser.fulfilled]: (state, action) => action.payload,
  },
});

export const { userLoggedOut } = userSlice.actions;

export const selectUser = ({ user }) => user;

export const selectUserShortcuts = ({ user }) => user.data.shortcuts;

export default userSlice.reducer;
