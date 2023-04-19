import { FC } from 'react';

import Notes from './components/Notes';
import Themes from './components/Themes';
import { useAppSelector } from '@/store/store';
import NoteDetail from './components/NoteDetail';
import NoteRedactor from './components/NoteRedactor';

import st from './ContentPage.module.scss';

const ContentPage: FC = () => {
    const notesStatus = useAppSelector(state => state.notes.status);

    const elementsBasedOnStatus = {
        edit: <NoteRedactor />,
        create: <NoteRedactor />,
        read: <NoteDetail />,
    };

    return (
        <main className={st.content}>
            <Themes />
            <Notes />
            {elementsBasedOnStatus[notesStatus]}
        </main>
    )
};

export default ContentPage;
