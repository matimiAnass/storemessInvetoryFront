import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';

export const getQuote = createAsyncThunk('quote/getQuote', async (quoteId) => {
  const response = await axios.get(`/api/quotes/${quoteId}`);
  const data = await response.data;

  return data === undefined ? null : data;
});

export const removeQuote = createAsyncThunk('/removeQuote', async (val, { dispatch, getState }) => {
  const { id } = getState().quoteApp.quote;
  await axios.delete(`/api/quotes/${id}`);
  return id;
});

export const saveQuote = createAsyncThunk(
  'quoteApp/quote',
  async (quoteData, { dispatch, getState }) => {
    const { id } = getState().quoteApp;

    const response = await axios.put(`/api/quotes/${id}`, quoteData);

    const data = await response.data;

    return data;
  }
);

const quoteSlice = createSlice({
  name: 'quoteApp/quote',
  initialState: null,
  reducers: {
    resetQuote: () => null,
    newQuote: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {
          id: FuseUtils.generateGUID(),
          name: '',
          account: '',
          status: '',
          created_at: '',
          ammount: '',
          assign_user: '',
          active: true,
        },
      }),
    },
  },
  extraReducers: {
    [getQuote.fulfilled]: (state, action) => action.payload,
    [saveQuote.fulfilled]: (state, action) => action.payload,
    [removeQuote.fulfilled]: (state, action) => null,
  },
});

export const { newQuote, resetQuote } = quoteSlice.actions;

export const selectQuote = ({ quoteApp }) => quoteApp.quote;

export default quoteSlice.reducer;
