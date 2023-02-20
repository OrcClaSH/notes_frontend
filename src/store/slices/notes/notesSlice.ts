import { createAsyncThunk, createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import { INote, INotesState } from './types';
import WithAuthService from '@/services/WithAuthService';

const initialState: INotesState = {
    notes: [],
    activeNote: {} as INote,
    isLoading: false,
    status: 'read',
    error: '',
};

export const fetchNotes = createAsyncThunk<INote[], string, { rejectValue: string }>(
    'notes/fetchNotes',
    async function (url, { rejectWithValue }) {
        const response = await WithAuthService.fetchNotes();

        if (response.status !== 200) {
            return rejectWithValue('Проблемы с получением списка заметок, попробуйте позже');
        };

        return response.data;
    }
);

export const patchNote = createAsyncThunk<INote, INote, { rejectValue: string }>(
    'notes/patchNote',
    async function (activeNote, thunkAPI) {
        const response = await WithAuthService.patchNote(activeNote);

        if (response.status !== 200) {
            return thunkAPI.rejectWithValue('Проблема с изменением Note, попробуйте позже');
        };

        return response.data;
    }
);

export const createNote = createAsyncThunk<INote, INote, { rejectValue: string }>(
    'notes/createNote',
    async function(newNote, thunkAPI) {
        const response = await WithAuthService.createNote(newNote);

        if (response.status !== 201) {
            return thunkAPI.rejectWithValue('Проблема при создании новой Note');
        }

        return response.data
    }
);

export const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        setActiveNote(state, action: PayloadAction<INote>) {
            state.activeNote = action.payload;
        },
        setTextActiveNote(state, action: PayloadAction<string>) {
            state.activeNote.text = action.payload;
        },
        setNotesStatus(state, action: PayloadAction<INotesState['status']>) {
            state.status = action.payload
            if (action.payload === 'create') {
                state.activeNote = {} as INote;
            }
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(fetchNotes.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchNotes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.notes = action.payload;
                state.error = '';
            })
            .addCase(fetchNotes.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'fetch notes error'
            })

            .addCase(patchNote.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(patchNote.fulfilled, (state, action) => {
                const foundNote = state.notes.find(note => note.id === action.payload.id)
                state.isLoading = false;
                if (foundNote?.text) {
                    foundNote.text = action.payload.text;
                    foundNote.title = action.payload.title
                    state.activeNote = action.payload;
                }
                state.error = '';
            })
            .addCase(patchNote.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'patch note error';
            })

            .addCase(createNote.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createNote.fulfilled, (state, action) => {
                state.isLoading = false;
                state.notes.push(action.payload);
                state.activeNote = action.payload;
                state.error = '';
            })
            .addCase(createNote.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'create note error';
            })
    }
});

export default notesSlice.reducer;
export const { setActiveNote, setTextActiveNote, setNotesStatus } = notesSlice.actions;
