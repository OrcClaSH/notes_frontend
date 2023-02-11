import { FC, useEffect, useState } from 'react';

import Signin from '@/components/Signin';
import { useAppDispatch, useAppSelector } from '@/store/store';
import Themes from './components/Themes';

import st from './MainPage.module.scss';
import Notes from './components/Notes';
import NoteRedactor from './components/NoteRedactor';
import NoteDetail from './components/NoteDetail';
import { checkAuth, getUser } from '@/store/slices/user/userSlice';


const MainPage: FC = () => {
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(state => state.user.isAuth);
    const isActiveTheme = useAppSelector(state => state.themes.activeTheme);
    const notesStatus = useAppSelector(state => state.notes.status);

    console.log('isAuth', isAuth)
    useEffect(() => {
        dispatch(getUser(''))
    }, [])

    const elementsBasedOnStatus = {
        redaction: <NoteRedactor />,
        creating: <NoteRedactor />,
        read: <NoteDetail />,
    };

    return (
        <div className={st.wrapper}>
            <Themes />
            <Notes />
            {elementsBasedOnStatus[notesStatus]}
            {(!isAuth && !isActiveTheme) && <Signin />}
        </div>
    )
};

export default MainPage;
