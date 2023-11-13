import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getContracts = createAsyncThunk('users/getContracts', async () => {
  const response = await axios.get('/api/contracts');
  const data = await response.data;

  return data;
});

export const removeContracts =
  createAsyncThunk('contracts', async (contractIds, { dispatch, getState }) => {
    await axios.delete('/api/contracts', { data: contractIds });

    return contractIds;
  });

const contractsAdapter = createEntityAdapter({});

export const { selectAll: selectContracts, selectById: selectContractsById } = contractsAdapter.getSelectors(
  (state) => state.contractsApp.contracts,
);

const contractsSlice = createSlice({
  name: 'contracts',
  initialState: contractsAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setContractsSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getContracts.fulfilled]: contractsAdapter.setAll,
    [removeContracts.fulfilled]: (state, action) => contractsAdapter.removeMany(state, action.payload),
  },
});

export const { setContractsSearchText } = contractsSlice.actions;

export const selectContractsSearchText = ({ contractsApp }) => contractsApp.contract?.searchText;

export default contractsSlice.reducer;
