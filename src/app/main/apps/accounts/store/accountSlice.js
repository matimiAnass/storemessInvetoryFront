import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';

export const getAccount = createAsyncThunk('user/getAccount', async (accountId) => {
  const response = await axios.get(`/api/accounts/${accountId}`);
  const data = await response.data;

  return data === undefined ? null : data;
});

export const removeAccount = createAsyncThunk(
  'account/removeAccount',
  async (val, { dispatch, getState }) => {
    const { id } = getState().accountsApp.account;
    await axios.delete(`/api/accounts/${id}`);
    return id;
  }
);
export const saveAccount = createAsyncThunk(
  'account/saveAccount',
  async (accountData, { dispatch, getState }) => {
    const { id } = getState().accountsApp;

    const response = await axios.put(`/api/accounts/${id}`, accountData);

    const data = await response.data;

    return data;
  }
);

const accountSlice = createSlice({
  name: 'account',
  initialState: null,
  reducers: {
    resetAccount: () => null,
    newAccount: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {
          id: FuseUtils.generateGUID(),
          name: '',
          email: '',
          website: '',
          assignedUser: '',
          active: true,
        },
      }),
    },
  },
  extraReducers: {
    [getAccount.fulfilled]: (state, action) => action.payload,
    [saveAccount.fulfilled]: (state, action) => action.payload,
    [removeAccount.fulfilled]: (state, action) => null,
  },
});

export const { newAccount, resetAccount } = accountSlice.actions;

export const selectAccount = ({ accountsApp }) => accountsApp.account;

export default accountSlice.reducer;
