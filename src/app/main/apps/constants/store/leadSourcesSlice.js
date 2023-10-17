import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getLeadSources =
  createAsyncThunk(
  'constantApp/leadSources/getLeadSources',
  async () => {
    const response = await axios.get('/api/constants/leadSources');
    const data = await response.data;
    return data;
  }
);

export const removeLeadSources = createAsyncThunk(
  'constantApp/leadSources',
  async (leadSourcesIds, { dispatch, getState }) => {
    await axios.delete('/api/constants/leadSources', { data: leadSourcesIds });

    return leadSourcesIds;
  }
);

const leadSourcesAdapter = createEntityAdapter({});

export const { selectAll: selectLeadSources, selectById: selectLeadSourcesById } =
  leadSourcesAdapter.getSelectors((state) => state.constantApp.leadSources);

const leadSourcesSlice = createSlice({
  name: 'constantApp/leadSources',
  initialState: leadSourcesAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setLeadSourcesSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getLeadSources.fulfilled]: leadSourcesAdapter.setAll,
    [removeLeadSources.fulfilled]: (state, action) =>
      leadSourcesAdapter.removeMany(state, action.payload),
  },
});

export const { setLeadSourcesSearchText } = leadSourcesSlice.actions;

export const selectLeadSourcesSearchText = ({ constantApp }) =>
  constantApp.leadSources.searchText;

export default leadSourcesSlice.reducer;
