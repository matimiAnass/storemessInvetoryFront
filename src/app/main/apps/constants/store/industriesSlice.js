import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getIndustrie } from './industrieSlice';
import { removeIndustrie } from './industrieSlice';

export const getIndustries =
  createAsyncThunk(
  'constantApp/accounts/industries/getIndustries',
  async () => {
    const response = await axios.get('/api/constants/accounts/industries');
    const data = await response.data;
    return data;
  }
);

export const removeIndustries = createAsyncThunk(
  'constantApp/accounts/industries',
  async (industrieIds, { dispatch, getState }) => {
    await axios.delete('/api/constants/accounts/industries', { data: industrieIds });

    return industrieIds;
  }
);

const industriesAdapter = createEntityAdapter({});

export const { selectAll: selectIndustries, selectById: selectIndustriesById } =
  industriesAdapter.getSelectors((state) => state.constantApp.industries);

const industriesSlice = createSlice({
  name: 'constantApp/accounts/industries',
  initialState: industriesAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setIndustriesSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getIndustries.fulfilled]: industriesAdapter.setAll,
    [removeIndustries.fulfilled]: (state, action) =>
      industriesAdapter.removeMany(state, action.payload),
  },
});

export const { setIndustriesSearchText } = industriesSlice.actions;

export const selectIndustriesSearchText = ({ constantApp }) =>
  constantApp.industries.searchText;

export default industriesSlice.reducer;
