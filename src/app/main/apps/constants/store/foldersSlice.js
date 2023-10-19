import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getFolder } from './folderSlice';

export const getFolders =
  createAsyncThunk(
  'constantApp/documents/folders/getFolders',
  async () => {
    const response = await axios.get('/api/constants/accounts/folders');
    const data = await response.data;
    return data;
  }
);

export const removeFolders = createAsyncThunk(
  'constantApp/documents/folders',
  async (folderIds, { dispatch, getState }) => {
    await axios.delete('/api/constants/documents/folders', { data: folderIds });

    return folderIds;
  }
);

const foldersAdapter = createEntityAdapter({});

export const { selectAll: selectFolders, selectById: selectFoldersById } =
  foldersAdapter.getSelectors((state) => state.constantApp.folders);

const foldersSlice = createSlice({
  name: 'constantApp/documents/folders',
  initialState: foldersAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setFoldersSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getFolders.fulfilled]: foldersAdapter.setAll,
    [removeFolders.fulfilled]: (state, action) =>
      foldersAdapter.removeMany(state, action.payload),
  },
});

export const { setFoldersSearchText } = foldersSlice.actions;

export const selectFoldersSearchText = ({ constantApp }) =>
  constantApp.folders.searchText;

export default foldersSlice.reducer;
