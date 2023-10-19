import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getType } from './typeDocSlice';

export const getTypes =
  createAsyncThunk(
  'constantApp/documents/types/getTypes',
  async () => {
    const response = await axios.get('/api/constants/documents/types');
    const data = await response.data;
    return data;
  }
);

export const removeTypes = createAsyncThunk(
  'constantApp/documents/types',
  async (typeIds, { dispatch, getState }) => {
    await axios.delete('/api/constants/documents/types', { data: typeIds });

    return typeIds;
  }
);

const typesAdapter = createEntityAdapter({});

export const { selectAll: selectTypes, selectById: selectTypesById } =
  typesAdapter.getSelectors((state) => state.constantApp.typesDoc);

const typesDocSlice = createSlice({
  name: 'constantApp/documents/types',
  initialState: typesAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setTypesSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getTypes.fulfilled]: typesAdapter.setAll,
    [removeTypes.fulfilled]: (state, action) =>
      typesAdapter.removeMany(state, action.payload),
  },
});

export const { setTypesSearchText } = typesDocSlice.actions;

export const selectTypesSearchText = ({ constantApp }) =>
  constantApp.typesDoc.searchText;

export default typesDocSlice.reducer;
