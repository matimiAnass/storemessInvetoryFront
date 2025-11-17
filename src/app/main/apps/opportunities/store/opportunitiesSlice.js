import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getOpportunities = createAsyncThunk('opportunities/getOpportunities', async () => {
  const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL_API}opportunities`);
  const data = await response.data;

  return data;
});

export const removeOpportunities = createAsyncThunk(
  'opportunities',
  async (opportunitieIds, { dispatch, getState }) => {
    await axios.delete('/api/opportunities', { data: opportunitieIds });

    return opportunitieIds;
  }
);

const opportunitiesAdapter = createEntityAdapter({});

export const { selectAll: selectOpportunities, selectById: selectOpportunitiesById } =
  opportunitiesAdapter.getSelectors((state) => state.opportunitiesApp.opportunities);

const opportunitiesSlice = createSlice({
  name: 'opportunities',
  initialState: opportunitiesAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setOpportunitiesSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getOpportunities.fulfilled]: opportunitiesAdapter.setAll,
    [removeOpportunities.fulfilled]: (state, action) =>
      opportunitiesAdapter.removeMany(state, action.payload),
  },
});

export const { setOpportunitiesSearchText } = opportunitiesSlice.actions;

export const selectOpportunitiesSearchText = ({ opportunitiesApp }) =>
  opportunitiesApp.opportunities.searchText;

export default opportunitiesSlice.reducer;
