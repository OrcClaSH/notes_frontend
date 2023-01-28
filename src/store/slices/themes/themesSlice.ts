import { createAsyncThunk, createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import { ITheme, IThemesState } from './types';
import AuthService from '@/services/AuthService';

const initialState: IThemesState = {
    themes: [],
    activeTheme: {} as ITheme,
    isLoading: false,
    error: '',
};

export const fetchThemes = createAsyncThunk<ITheme[], string, { rejectValue: string }>(
    'themes/fetchThemes',
    async function (url, { rejectWithValue }) {
        const response = await AuthService.fetchThemes();

        if (response.status !== 200) {
            return rejectWithValue('Проблемы с получением списка тем, попробуйте позже');
        };

        return response.data;
    }
);

export const themesSlice = createSlice({
    name: 'themes',
    initialState,
    reducers: {
        setActiveTheme(state, action: PayloadAction<ITheme>) {
            state.activeTheme = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchThemes.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchThemes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.themes = action.payload;
                state.error = '';
            })
            .addCase(fetchThemes.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'fetch themes error'
            })
    }
});

export default themesSlice.reducer;

export const { setActiveTheme } = themesSlice.actions;
