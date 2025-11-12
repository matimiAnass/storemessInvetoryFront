import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';

export const getTaskStage = createAsyncThunk('taskStage/getTaskStages', async (taskStageId) => {
  const response = await axios.get(`/api/taskStages/${taskStageId}`);
  const data = await response.data;

  return data === undefined ? null : data;
});

export const removeTaskStage = createAsyncThunk(
  '/removeTaskStage',
  async (val, { dispatch, getState }) => {
    const { id } = getState().constantApp.taskStage;
    await axios.delete(`/api/taskStage/${id}`);
    return id;
  }
);

export const saveTaskStage = createAsyncThunk(
  'constantApp/TaskStage',
  async (taskStageData, { dispatch, getState }) => {
    const { id } = getState().constantApp;

    const response = await axios.put(`/api/taskStage/${id}`, taskStageData);

    const data = await response.data;

    return data;
  }
);

const taskStageSlice = createSlice({
  name: 'constantsApp/taskStage',
  initialState: null,
  reducers: {
    resetTaskStage: () => null,
    newTaskStage: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {
          id: FuseUtils.generateGUID(),
          task_stage: '',
          active: true,
        },
      }),
    },
  },
  extraReducers: {
    [getTaskStage.fulfilled]: (state, action) => action.payload,
    [saveTaskStage.fulfilled]: (state, action) => action.payload,
    [removeTaskStage.fulfilled]: (state, action) => null,
  },
});

export const { newTaskStage, resetTaskStage } = taskStageSlice.actions;

export const selectTaskStage = ({ constantApp }) => constantApp.taskStage;

export default taskStageSlice.reducer;
