import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';

export const getNotes = createAsyncThunk('ContractsShowApp/show/getContract', async (routeParams) => {
  const { filter, id } = routeParams;

  let url;

  console.log(routeParams.filter);


  if (routeParams.filter === 'attachement') {
    url = `/api/notes/attachement`;
  }

  if (routeParams.filter === 'comment') {
    url = `/api/notes/comment`;
  }
  if (routeParams.filter === 'note') {
    url = `/api/notes/note`;
  }

  if (!routeParams.filter) {
    url = `/api/notes`;
  }

  const response = await axios.get(url);
  const data = await response.data;

  return data;
});

export const createNote = createAsyncThunk('ContractsShowApp/show/createContract', async (note) => {
  const response = await axios.post('/api/notes', note);
  const data = await response.data;

  return data;
});

export const updateNote = createAsyncThunk('ContractsShowApp/show/updateContract', async (note) => {
  const response = await axios.put(`/api/notes/${note.id}`, note);
  const data = await response.data;

  return data;
});

export const removeNote = createAsyncThunk(
  'ContractsShowApp/show/removeContract',
  async (id, { dispatch, getState }) => {
    const response = await axios.delete(`/api/notes/${id}`);
    const data = await response.data;

    dispatch(closeNoteDialog());

    return data;
  }
);

const notesAdapter = createEntityAdapter({});

export const {
  selectAll: selectNotes,
  selectEntities: selectNotesEntities,
  selectById: selectNoteById,
} = notesAdapter.getSelectors((state) => state.ContractsShowApp.notes);

const contractsShowSlice = createSlice({
  name: 'ContractsShowApp/contracts',
  initialState: notesAdapter.getInitialState({
    searchText: '',
    noteDialogId: null,
    variateDescSize: true,
  }),
  reducers: {
    setNotesSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
    resetNotesSearchText: (state, action) => {
      state.searchText = '';
    },
    toggleVariateDescSize: (state, action) => {
      state.variateDescSize = !state.variateDescSize;
    },
    openNoteDialog: (state, action) => {
      state.noteDialogId = action.payload;
    },
    closeNoteDialog: (state, action) => {
      state.noteDialogId = action.null;
    },
  },
  extraReducers: {
    [getNotes.fulfilled]: notesAdapter.setAll,
    [createNote.fulfilled]: notesAdapter.addOne,
    [updateNote.fulfilled]: notesAdapter.upsertOne,
    [removeNote.fulfilled]: notesAdapter.removeOne,
  },
});

export const {
  setNotesSearchText,
  resetNotesSearchText,
  toggleVariateDescSize,
  openNoteDialog,
  closeNoteDialog,
} = contractsShowSlice.actions;

export const selectVariateDescSize = ({ ContractsShowApp }) => ContractsShowApp.notes.variateDescSize;

export const selectSearchText = ({ ContractsShowApp }) => ContractsShowApp.notes.searchText;

export const selectDialogNoteId = ({ ContractsShowApp }) => ContractsShowApp.notes.noteDialogId;

export const selectDialogNote = createSelector(
  [selectDialogNoteId, selectNotesEntities],
  (noteId, notesEntities) => {
    return notesEntities[noteId];
  }
);

export default contractsShowSlice.reducer;
