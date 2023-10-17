import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getCategorie } from './categorieSlice';
import { removeCategorie } from './categorieSlice';

export const getCategories =
  createAsyncThunk(
    'constantApp/products/categories/getCategories',
    async () => {
      const response = await axios.get('/api/constants/accounts/categories');
      const data = await response.data;
      return data;
    }
  );

export const removeCategories = createAsyncThunk(
  'constantApp/products/categories',
  async (categorieIds, { dispatch, getState }) => {
    await axios.delete('/api/constants/products/categories', { data: categorieIds });

    return categorieIds;
  }
);

const categoriesAdapter = createEntityAdapter({});

export const { selectAll: selectCategories, selectById: selectCategoriesById } =
  categoriesAdapter.getSelectors((state) => state.constantApp.categories);

const categoriesSlice = createSlice({
  name: 'constantApp/products/categories',
  initialState: categoriesAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setCategoriesSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getCategories.fulfilled]: categoriesAdapter.setAll,
    [removeCategories.fulfilled]: (state, action) =>
      categoriesAdapter.removeMany(state, action.payload),
  },
});

export const { setCategoriesSearchText } = categoriesSlice.actions;

export const selectCategoriesSearchText = ({ constantApp }) =>
  constantApp.categories.searchText;

export default categoriesSlice.reducer;
