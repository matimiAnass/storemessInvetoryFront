import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';

export const getContract = createAsyncThunk('contract/getContract', async (contractId) => {
  const response = await axios.get(`http://192.168.1.17:8000/api/contract/${contractId}`);
  const data = await response.data;
  return data;
});
export const getDropdownList = createAsyncThunk('contract/getDropdownList', async () => {
  const response = await axios.get(`http://192.168.1.17:8000/api/createApiDropdownList`);
  const data = await response.data;
  return data;
});
export const getFilesAttachement = createAsyncThunk('contract/getFilesAttachement', async (contractId) => {
  const response = await axios.get(`http://192.168.1.17:8000/api/contract/show/${contractId}`);
  const data = await response.data;
  return data;
});
export const descriptionStore = createAsyncThunk('contract/getDescriptionStore',
  async (contractData,{ dispatch, getState }) => {
  const { id } = getState().contractApp.contract.contract;
  const response = await axios.post(`http://192.168.1.17:8000/api/contract/${id}/description/`,contractData);
  const data = await response.data;
  return data;
});

export const fileUpload = createAsyncThunk('contract/fileUpload',
  async (formData,{ dispatch, getState }) => {
  const { id } = getState().contractApp.contract.contract;
  const response = await axios.post(`http://192.168.1.17:8000/api/contract/${id}/file`,formData,
    { headers: { 'Content-Type':  `multipart/form-data; boundary=${ Math.random().toString().substr(2)}` }, });

  const data = await response.data;
  return data;
});

export const removeContract = createAsyncThunk(
  'contract/removeContract',
  async (val, { dispatch, getState }) => {
    const { id } = getState().contractApp.contract.contract;
    await axios.delete(`http://192.168.1.17:8000/api/contract/${id}`);
    return id;
  }
);
export const saveContract = createAsyncThunk(
  'contract/saveContract',
  async (contractData, { dispatch, getState }) => {
    const { id } = getState().contractApp.contract.contract;

    const response = await axios.put(`http://192.168.1.17:8000/api/contract/${id}`, contractData);

    const data = await response.data;

    return data;
  }
);

const contractSlice = createSlice({
  name: 'contract',
  initialState: { contract : null, dropDownLists : null, filesAttachement: null },
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
    [saveContract.fulfilled]: (state, action) => action.payload,
    [removeContract.fulfilled]: (state, action) => null,
  },
});

export const { newContract, resetContract } = contractSlice.actions;

export const selectContract = ({ contractApp }) => contractApp.contract;

export default contractSlice.reducer;
