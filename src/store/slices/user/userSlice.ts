import { AnyAction, createAsyncThunk, createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

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

// TODO ..api/v1/users/me - getting user data not working
export const login = createAsyncThunk<IAuthResponse, IArgs, {rejectValue: string}>(
    'user/login',
    async function (args, { rejectWithValue }) {
        const {username, password} = args;
        try {
            const response = await WithAuthService.login(username, password);
            // return response.data;
            return {...response.data, user: {username, id: 3}} //! only test
        } catch (error: any) {
            console.error('[login AsyncThunk]', error)
            return rejectWithValue(error?.response?.data?.message || `Проблемы с получением данных пользователя`)
        }
    }
);

export const getUser = createAsyncThunk<IUser, any, {rejectValue: string}>(
    'user/getUser',
    async function (_, thunkAPI) {
        const response = await WithAuthService.getUser();

        if (response.status !== 200) {
            return thunkAPI.rejectWithValue('Проблема с получением данных о пользователе')
        }

        return response.data;
    }
);

export const checkAuth = createAsyncThunk<IAuthResponse, IArgs, { rejectValue: string}>(
    'user/checkAuth',
    async function( _, { rejectWithValue }) {
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
    reducers: {},
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
                localStorage.setItem('token', action.payload.access);
                // console.log('action.payload', action.payload)
                // console.log('user state', current(state))
                // console.log('localStorage', localStorage.getItem('token'))
            })
            .addCase(login. rejected, (state, action) => {
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
                // console.log(action.payload.user)
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
    }
})

export default userSlice.reducer;
