import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import userReducer from "./slices/user/userSlice";
import themesReducer from "./slices/themes/themesSlice";
import notesReducer from "./slices/notes/notesSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        themes: themesReducer,
        notes: notesReducer,
    },
});

export type TRootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
