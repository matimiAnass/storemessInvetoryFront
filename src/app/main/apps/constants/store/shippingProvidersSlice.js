import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getShippingProviders = createAsyncThunk(
  'constantApp/shippingProviders/getShippingProviders',
  async () => {
    const response = await axios.get('/api/constants/shippingProviders');
    const data = await response.data;
    return data;
  }
);

export const removeShippingProviders = createAsyncThunk(
  'constantApp/shippingProviders',
  async (shippingProviderIds, { dispatch, getState }) => {
    await axios.delete('/api/constants/shippingProviders', { data: shippingProviderIds });

    return shippingProviderIds;
  }
);

const shippingProvidersAdapter = createEntityAdapter({});

export const { selectAll: selectShippingProviders, selectById: selectShippingProvidersById } =
  shippingProvidersAdapter.getSelectors((state) => state.constantApp.shippingProviders);

const shippingProvidersSlice = createSlice({
  name: 'constantApp/shippingProviders',
  initialState: shippingProvidersAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setShippingProvidersSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getShippingProviders.fulfilled]: shippingProvidersAdapter.setAll,
    [removeShippingProviders.fulfilled]: (state, action) =>
      shippingProvidersAdapter.removeMany(state, action.payload),
  },
});

export const { setShippingProvidersSearchText } = shippingProvidersSlice.actions;

export const selectShippingProvidersSearchText = ({ constantApp }) =>
  constantApp.shippingProviders.searchText;

export default shippingProvidersSlice.reducer;
