import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';

export const getType = createAsyncThunk('type/getTypes', async (typeId) => {
  const response = await axios.get(`/api/constants/documents/types/${typeId}`);
  const data = await response.data;

  return data === undefined ? null : data;
});

export const removeType = createAsyncThunk('/removeType', async (val, { dispatch, getState }) => {
  const { id } = getState().constantApp.typeDoc;
  await axios.delete(`/api//constants/documents/type/${id}`);
  return id;
});

export const saveType = createAsyncThunk(
  'constantApp/documents/type',
  async (typeData, { dispatch, getState }) => {
    const { id } = getState().constantApp;

    const response = await axios.put(`/api/type/${id}`, typeData);

    const data = await response.data;

    return data;
  }
);

const typeDocSlice = createSlice({
  name: 'constantsApp/documents/type',
  initialState: null,
  reducers: {
    resetType: () => null,
    newType: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {
          id: FuseUtils.generateGUID(),
          type: '',
          active: true,
        },
      }),
    },
  },
  extraReducers: {
    [getType.fulfilled]: (state, action) => action.payload,
    [saveType.fulfilled]: (state, action) => action.payload,
    [removeType.fulfilled]: (state, action) => null,
  },
});

export const { newType, resetType } = typeDocSlice.actions;

export const selectType = ({ constantApp }) => constantApp.typeDoc;

export default typeDocSlice.reducer;
