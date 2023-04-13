import { createAsyncThunk, createSlice, current, PayloadAction } from '@reduxjs/toolkit';

import { IUser, IAuthResponse, IUserState } from './types';
import WithAuthService from '@/services/WithAuthService';

interface IArgs {
    username: string;
    password: string;
};

const initialState: IUserState = {
    user: {} as IUser,
    isAuth: false,
    isLoading: false,
    error: '',
};

export const login = createAsyncThunk<IAuthResponse, IArgs, { rejectValue: string }>(
    'user/login',
    async function (args, { rejectWithValue }) {
        const { username, password } = args;
        try {
            const responseTokens = await WithAuthService.login(username, password);

            localStorage.setItem('token', responseTokens.data.access)
            const responseUser = await WithAuthService.getUser()

            return { ...responseTokens.data, user: responseUser.data }
        } catch (error: any) {
            console.error('[login AsyncThunk]', error) // TODO remove
            return rejectWithValue(error?.response?.data?.message || `Проблемы с получением данных пользователя`)
        }
    }
);

export const registration = createAsyncThunk<IAuthResponse, IArgs, { rejectValue: string }>(
    'user/registration',
    async function (args, { rejectWithValue }) {
        const { username, password } = args;
        try {
            const response = await WithAuthService.registration(username, password);
            return response.data
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message || 'Проблемы при регистрации пользователя')
        }
    }
);

export const getUser = createAsyncThunk<IUser, void, { rejectValue: string }>(
    'user/getUser',
    async function (_, thunkAPI) {
        const response = await WithAuthService.getUser();

        if (response.status !== 200) {
            return thunkAPI.rejectWithValue('Проблема с получением данных о пользователе')
        }

        return response.data;
    }
);

export const checkAuth = createAsyncThunk<IAuthResponse, IArgs, { rejectValue: string }>(
    'user/checkAuth',
    async function (_, { rejectWithValue }) {
        const response = await WithAuthService.refresh();

        if (response.status !== 200) {
            return rejectWithValue('Проблемы с обновлением токена пользователя')
        }
        return response.data;
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout(state, action: PayloadAction) {
            state.isAuth = false;
            state.user = {} as IUser;
            localStorage.removeItem('token')
        }
    },
    extraReducers: (builder) => {
        builder

            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuth = true;
                state.error = '';
                state.user = action.payload.user;
                // localStorage.setItem('token', action.payload.access);
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'logging error'
            })

            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuth = true;
                state.error = '';
                // state.user = action.payload.user;
                localStorage.setItem('token', action.payload.access);
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'check auth error';
            })

            .addCase(getUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuth = true; //TODO temp test
                state.user = action.payload;
                state.error = '';
            })
            .addCase(getUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'get user data error'
            })

            .addCase(registration.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registration.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuth = true; //TODO temp test
                state.error = '';
                console.log('action', action)
                state.user = { ...action.payload.user };
                // localStorage.setItem('token', action.payload.access);
            })
            .addCase(registration.rejected, (state, action) => {
                console.log('rejected action', action)
                state.isLoading = false;
                state.error = action.payload || 'logging error'
            })
    }
})

export default userSlice.reducer;

export const { logout } = userSlice.actions;
