import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getBrands = createAsyncThunk('constantApp/products/brands/getBrands', async () => {
  const response = await axios.get('/api/constants/accounts/brands');
  const data = await response.data;
  return data;
});

export const removeBrands = createAsyncThunk(
  'constantApp/products/brands',
  async (brandIds, { dispatch, getState }) => {
    await axios.delete('/api/constants/products/brands', { data: brandIds });

    return brandIds;
  }
);

const brandsAdapter = createEntityAdapter({});

export const { selectAll: selectBrands, selectById: selectBrandsById } = brandsAdapter.getSelectors(
  (state) => state.constantApp.brands
);

const brandsSlice = createSlice({
  name: 'constantApp/products/brands',
  initialState: brandsAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setBrandsSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getBrands.fulfilled]: brandsAdapter.setAll,
    [removeBrands.fulfilled]: (state, action) => brandsAdapter.removeMany(state, action.payload),
  },
});

export const { setBrandsSearchText } = brandsSlice.actions;

export const selectBrandsSearchText = ({ constantApp }) => constantApp.brands.searchText;

export default brandsSlice.reducer;
