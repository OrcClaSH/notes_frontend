import { createAsyncThunk, createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import { ITheme, IThemesState } from './types';
import WithAuthService from '@/services/WithAuthService';

const initialState: IThemesState = {
    themes: [],
    activeTheme: {} as ITheme,
    redactionTheme: {} as ITheme,
    isLoading: false,
    isRedaction: false,
    error: '',
};

export const fetchThemes = createAsyncThunk<ITheme[], string, { rejectValue: string }>(
    'themes/fetchThemes',
    async function (_, { rejectWithValue }) {
        const response = await WithAuthService.fetchThemes();

        if (response.status !== 200) {
            return rejectWithValue('Проблемы с получением списка тем, попробуйте позже');
        };

        return response.data;
    }
);

export const createTheme = createAsyncThunk<ITheme, { title: string }, { rejectValue: string }>(
    'themes/createTheme',
    async function (themeTitle, thunkAPI) {
        const response = await WithAuthService.createTheme(themeTitle)

        if (response.status !== 201) {
            return thunkAPI.rejectWithValue('Проблемы при создании новой темы');
        }

        return response.data
    }
)

export const patchTheme = createAsyncThunk<ITheme, ITheme, { rejectValue: string }>(
    'themes/patchTheme',
    async function(theme, thunkAPI) {
        const response = await WithAuthService.patchTheme(theme);

        if (response.status !== 200) {
            return thunkAPI.rejectWithValue('Проблемы при изменении темы');
        }

        return response.data;
    }
)

export const deleteTheme = createAsyncThunk<number, number, { rejectValue: string}>(
    'themes/deleteTheme',
    async function(id, thunkAPI) {
        const response = await WithAuthService.deleteTheme(id)

        if (response.status != 204) {
            return thunkAPI.rejectWithValue('Проблемы при удалении темы');
        }

        return id
    }
)

export const themesSlice = createSlice({
    name: 'themes',
    initialState,
    reducers: {
        setActiveTheme(state, action: PayloadAction<ITheme>) {
            state.activeTheme = action.payload;
        },
        setIsRedaction(state, action: PayloadAction<{isRedaction: Boolean, theme?: ITheme}>) {
            state.isRedaction = action.payload.isRedaction;
            if (action.payload.theme && action.payload.isRedaction) {
                state.redactionTheme = action.payload.theme;
            }
            if (!action.payload.isRedaction) {
                state.redactionTheme = {} as ITheme
            }
        },
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
                state.error = action.payload || 'fetch themes error'
            })

            .addCase(createTheme.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createTheme.fulfilled, (state, action) => {
                state.isLoading = false;
                state.themes.push(action.payload);
                state.activeTheme = action.payload
                state.error = ''
            })
            .addCase(createTheme.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'create theme error';
            })

            .addCase(patchTheme.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(patchTheme.fulfilled, (state, action) => {
                state.isLoading = false;
                const foundTheme = state.themes.find(theme => theme.id === action.payload.id);
                if (foundTheme?.title) {
                    foundTheme.title = action.payload.title;
                }
                state.activeTheme = action.payload;
            })
            .addCase(patchTheme.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'patch theme error';
            })

            .addCase(deleteTheme.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteTheme.fulfilled, (state, action) => {
                state.isLoading = false;
                state.themes = state.themes.filter(theme => theme.id !== action.payload);
            })
            .addCase(deleteTheme.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload || 'delete theme error';
            })

    }
});

export default themesSlice.reducer;

export const { setActiveTheme, setIsRedaction } = themesSlice.actions;
