import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getWidgets = createAsyncThunk('analyticsDashboardApp/widgets/getWidgets', async () => {
  const response = await axios.get('http://192.168.1.17:8000/api/counter/genders');

  const data = await response.data;

  return data;
});
// export const getGender = createAsyncThunk('analyticsDashboardApp/widgets/geGenders', async () => {
//   const response = await axios.get('http://192.168.1.17:8000/api/counter/genders');
//
//   const data = await response.data;
//
//   return data;
// });

const widgetsSlice = createSlice({
  name: 'analyticsDashboardApp',
  initialState: { },
  reducers: {},
  extraReducers: {
    [getWidgets.fulfilled]: (state, action) =>  action.payload,
  },
});

export const selectWidgets = ({ analyticsDashboardApp }) => analyticsDashboardApp.widgets;

export default widgetsSlice.reducer;
