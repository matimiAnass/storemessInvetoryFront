import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';

export const getCategorie = createAsyncThunk('categorie/getCategories', async (categorieId) => {
  const response = await axios.get(`/api/constants/products/categories/${categorieId}`);
  const data = await response.data;

  return data === undefined ? null : data;
});

export const removeCategorie = createAsyncThunk(
  '/removeCategorie',
  async (val, { dispatch, getState }) => {
    const { id } = getState().constantApp.categorie;
    await axios.delete(`/api/constants/products/categorie/${id}`);
    return id;
  }
);

export const saveCategorie = createAsyncThunk(
  'constantApp/products/categorie',
  async (categorieData, { dispatch, getState }) => {
    const { id } = getState().constantApp;

    const response = await axios.put(`/api/categorie/${id}`, categorieData);

    const data = await response.data;

    return data;
  }
);

const categorieSlice = createSlice({
  name: 'constantsApp/products/categorie',
  initialState: null,
  reducers: {
    resetCategorie: () => null,
    newCategorie: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {
          id: FuseUtils.generateGUID(),
          categorie: '',
          active: true,
        },
      }),
    },
  },
  extraReducers: {
    [getCategorie.fulfilled]: (state, action) => action.payload,
    [saveCategorie.fulfilled]: (state, action) => action.payload,
    [removeCategorie.fulfilled]: (state, action) => null,
  },
});

export const { newCategorie, resetCategorie } = categorieSlice.actions;

export const selectCategorie = ({ constantApp }) => constantApp.categorie;

export default categorieSlice.reducer;
