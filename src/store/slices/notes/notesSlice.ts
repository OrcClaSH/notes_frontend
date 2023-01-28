import { createAsyncThunk, createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import { INote, INotesState } from './types';
import AuthService from '@/services/AuthService';

const initialState: INotesState = {
    notes: [],
    activeNote: {} as INote,
    isLoading: false,
    error: '',
};

export const fetchNotes = createAsyncThunk<INote[], string, { rejectValue: string }>(
    'notes/fetchNotes',
    async function (url, { rejectWithValue }) {
        const response = await AuthService.fetchNotes();

        if (response.status !== 200) {
            return rejectWithValue('Проблемы с получением списка заметок, попробуйте позже');
        };

        return response.data;
    }
);

export const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        setActiveNote(state, action: PayloadAction<INote>) {
            state.activeNote = action.payload;
        }
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
    }
});

export default notesSlice.reducer;
export const { setActiveNote } = notesSlice.actions;
