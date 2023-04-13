import { FC, useEffect } from 'react';

import StartPage from '../StartPage';
import Notes from './components/Notes';
import Themes from './components/Themes';
import NoteDetail from './components/NoteDetail';
import NoteRedactor from './components/NoteRedactor';
import { getUser } from '@/store/slices/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';

import st from './ContentPage.module.scss';

const ContentPage: FC = () => {
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(state => state.user.isAuth);
    const notesStatus = useAppSelector(state => state.notes.status);

    useEffect(() => {
        dispatch(getUser())
    }, []);

    const elementsBasedOnStatus = {
        edit: <NoteRedactor />,
        create: <NoteRedactor />,
        read: <NoteDetail />,
    };

    return (
        <>
            {!isAuth
                ? <StartPage />
                : (
                    <main className={st.content}>
                        <Themes />
                        <Notes />
                        {elementsBasedOnStatus[notesStatus]}
                    </main>
                )
            }
        </>
    )
};

export default ContentPage;
