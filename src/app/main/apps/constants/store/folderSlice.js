import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';

export const getFolder = createAsyncThunk('folder/getFolders', async (folderId) => {
  const response = await axios.get(`/api/constants/documents/folders/${folderId}`);
  const data = await response.data;

  return data === undefined ? null : data;
});

export const removeFolder = createAsyncThunk(
  '/removeFolder',
  async (val, { dispatch, getState }) => {
    const { id } = getState().constantApp.folder;
    await axios.delete(`/api//constants/documents/folder/${id}`);
    return id;
  }
);

export const saveFolder = createAsyncThunk(
  'constantApp/documents/folder',
  async (folderData, { dispatch, getState }) => {
    const { id } = getState().constantApp;

    const response = await axios.put(`/api/folder/${id}`, folderData);

    const data = await response.data;

    return data;
  }
);

const folderSlice = createSlice({
  name: 'constantsApp/documents/folder',
  initialState: null,
  reducers: {
    resetFolder: () => null,
    newFolder: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {
          id: FuseUtils.generateGUID(),
          folder: '',
          active: true,
        },
      }),
    },
  },
  extraReducers: {
    [getFolder.fulfilled]: (state, action) => action.payload,
    [saveFolder.fulfilled]: (state, action) => action.payload,
    [removeFolder.fulfilled]: (state, action) => null,
  },
});

export const { newFolder, resetFolder } = folderSlice.actions;

export const selectFolder = ({ constantApp }) => constantApp.folder;

export default folderSlice.reducer;
