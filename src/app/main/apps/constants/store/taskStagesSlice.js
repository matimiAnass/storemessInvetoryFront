import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getTaskStages =
  createAsyncThunk(
  'constantApp/taskStages/getTaskStages',
  async () => {
    const response = await axios.get('/api/constants/taskStages');
    const data = await response.data;
    return data;
  }
);

export const removeTaskStages = createAsyncThunk(
  'constantApp/taskStages',
  async (taskStageIds, { dispatch, getState }) => {
    await axios.delete('/api/constants/taskStages', { data: taskStageIds });

    return taskStageIds;
  }
);

const taskStagesAdapter = createEntityAdapter({});

export const { selectAll: selectTaskStages, selectById: selectTaskStagesById } =
  taskStagesAdapter.getSelectors((state) => state.constantApp.taskStages);

const taskStagesSlice = createSlice({
  name: 'constantApp/taskStages',
  initialState: taskStagesAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setTaskStagesSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getTaskStages.fulfilled]: taskStagesAdapter.setAll,
    [removeTaskStages.fulfilled]: (state, action) =>
      taskStagesAdapter.removeMany(state, action.payload),
  },
});

export const { setTaskStagesSearchText } = taskStagesSlice.actions;

export const selectTaskStagesSearchText = ({ constantApp }) =>
  constantApp.taskStages.searchText;

export default taskStagesSlice.reducer;
