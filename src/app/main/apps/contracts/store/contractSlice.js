import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getContract = createAsyncThunk('contract/getContract', async (contractId) => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND_URL_API}contract/${contractId}`
  );
  const data = await response.data;
  return data;
});
export const getDropdownList = createAsyncThunk('contract/getDropdownList', async () => {
  const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL_API}createApiDropdownList`);
  const data = await response.data;
  return data;
});
export const getFilesAttachement = createAsyncThunk(
  'contract/getFilesAttachement',
  async (contractId) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL_API}contract/show/${contractId}`
    );
    const data = await response.data;
    return data;
  }
);
export const getComments = createAsyncThunk('contract/getComments', async (contractId) => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND_URL_API}contract/${contractId}/comments`
  );
  const data = await response.data;
  return data;
});
export const descriptionStore = createAsyncThunk(
  'contract/getDescriptionStore',
  async (contractData, { dispatch, getState }) => {
    const { id } = getState().contractApp.contract.contract;
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL_API}contract/${id}/description/`,
      contractData
    );
    const data = await response.data;
    return data;
  }
);

export const fileUpload = createAsyncThunk(
  'contract/fileUpload',
  async (formData, { dispatch, getState }) => {
    const { id } = getState().contractApp.contract.contract;
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL_API}contract/${id}/file`,
      formData,
      {
        headers: {
          'Content-Type': `multipart/form-data; boundary=${Math.random().toString().substr(2)}`,
        },
      }
    );

    const data = await response.data;
    return data;
  }
);
export const commentStore = createAsyncThunk(
  'contract/getCommentStore',
  async (contractData, { dispatch, getState }) => {
    const { id } = getState().contractApp.contract.contract;
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL_API}contract/${id}/addComment/`,
      contractData
    );

    const data = await response.data;
    console.log(data);
    return data;
  }
);

export const removeContract = createAsyncThunk(
  'contract/removeContract',
  async (val, { dispatch, getState }) => {
    const { id } = getState().contractApp.contract.contract;
    await axios.delete(`${process.env.REACT_APP_BACKEND_URL_API}contract/${id}`);
    return id;
  }
);
export const saveContract = createAsyncThunk(
  'contract/saveContract',
  async (contractData, { dispatch, getState }) => {
    const { id } = getState().contractApp.contract.contract;

    const response = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL_API}contract/${id}`,
      contractData
    );

    const data = await response.data;

    return data;
  }
);

const contractSlice = createSlice({
  name: 'contract',
  initialState: { contract: null, dropDownLists: null, filesAttachement: null, comments: null },
  reducers: {
    resetContract: () => {},
    newContract: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {
          id: 0,
          name: '',
          client_name: '',
          value: '',
          type: '',
          start_date: '',
          end_date: '',
          status: '',
          active: true,
        },
      }),
    },
  },
  extraReducers: {
    [getContract.fulfilled]: (state, action) => {
      state.contract = action.payload;
    },
    [getDropdownList.fulfilled]: (state, action) => {
      state.dropDownLists = action.payload;
    },
    [getFilesAttachement.fulfilled]: (state, action) => {
      state.filesAttachement = action.payload;
    },
    [getComments.fulfilled]: (state, action) => {
      state.comments = action.payload;
    },
    [saveContract.fulfilled]: (state, action) => action.payload,
    [removeContract.fulfilled]: (state, action) => null,
  },
});

export const { newContract, resetContract } = contractSlice.actions;

export const selectContract = ({ contractApp }) => contractApp.contract;

export default contractSlice.reducer;
