import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getWidgets = createAsyncThunk('contractsDashboardApp/widgets/getWidgets', async () => {
  const response = await axios.get('http://192.168.1.17:8000/api/contracts');

  const data = await response.data;

  return data;
});

const widgetsSlice = createSlice({
  name: 'contractsDashboardApp/widgets',
  initialState: null,
  reducers: {},
  extraReducers: {
    [getWidgets.fulfilled]: (state, action) => action.payload,
  },
});

export const selectWidgets = ({ contractsDashboardApp }) => contractsDashboardApp.widgets;

export default widgetsSlice.reducer;
