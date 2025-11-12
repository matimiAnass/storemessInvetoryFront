import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getWidgets = createAsyncThunk('analyticsDashboardApp/widgets/getWidgets', async () => {
  // const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL_API}counter/visitors`);
  //
  // const data = await response.data;
  //
  // return data;
});
// export const getGender = createAsyncThunk('analyticsDashboardApp/widgets/geGenders', async () => {
//   const response = await axios.get('http://127.0.0.1:8000/api/counter/genders');
//
//   const data = await response.data;
//
//   return data;
// });

const widgetsSlice = createSlice({
  name: 'analyticsDashboardApp',
  initialState: {},
  reducers: {},
  extraReducers: {
    [getWidgets.fulfilled]: (state, action) => action.payload,
  },
});

export const selectWidgets = ({ analyticsDashboardApp }) => analyticsDashboardApp.widgets;

export default widgetsSlice.reducer;
