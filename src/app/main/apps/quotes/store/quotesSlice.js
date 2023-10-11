import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getQuotes = createAsyncThunk('quotes/getQuotes', async () => {
  const response = await axios.get('/api/quotes');
  const data = await response.data;

  return data;
});

export const removeQuotes =
  createAsyncThunk('quotes', async (quoteIds, { dispatch, getState }) => {
  await axios.delete('/api/quotes', { data: quoteIds });

  return quoteIds;
});

const quotesAdapter = createEntityAdapter({});

export const { selectAll: selectQuotes, selectById: selectQuotesById } = quotesAdapter.getSelectors(
  (state) => state.quotesApp.quotes
);

const quotesSlice = createSlice({
  name: 'quotes',
  initialState: quotesAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setQuotesSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getQuotes.fulfilled]: quotesAdapter.setAll,
    [removeQuotes.fulfilled]: (state, action) => quotesAdapter.removeMany(state, action.payload),
  },
});

export const { setQuotesSearchText } = quotesSlice.actions;

export const selectQuotesSearchText = ({ QuotesApp }) => QuotesApp?.quotes?.searchText;

export default quotesSlice.reducer;
