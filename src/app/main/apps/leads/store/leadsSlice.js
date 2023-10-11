import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getLeads = createAsyncThunk('leads/getLeads', async () => {
  const response = await axios.get('/api/leads');
  const data = await response.data;

  return data;
});

export const removeLeads =
  createAsyncThunk('leads', async (quoteIds, { dispatch, getState }) => {
  await axios.delete('/api/leads', { data: quoteIds });

  return quoteIds;
});

const leadsAdapter = createEntityAdapter({});

export const { selectAll: selectLeads, selectById: selectLeadsById } = leadsAdapter.getSelectors(
  (state) => state.leadsApp.leads
);

const leadsSlice = createSlice({
  name: 'leads',
  initialState: leadsAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setLeadsSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getLeads.fulfilled]: leadsAdapter.setAll,
    [removeLeads.fulfilled]: (state, action) => leadsAdapter.removeMany(state, action.payload),
  },
});

export const { setLeadsSearchText } = leadsSlice.actions;

export const selectLeadsSearchText = ({ LeadsApp }) => LeadsApp?.leads?.searchText;

export default leadsSlice.reducer;
