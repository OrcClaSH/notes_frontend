import { FC, useState } from 'react';

import Signin from '@/components/Signin';
import { useAppSelector } from '@/store/store';
import Themes from './components/Themes';

import st from './MainPage.module.scss';
import Notes from './components/Notes';
import NoteDetail from './components/NoteDetail';
import NoteRedactor from './components/NoteRedactor';
import NoteTestEditor from './components/NoteTestEditor';
import NoteTestDetail from './components/NoteTestDetail';


const MainPage: FC = () => {
    const [isRedactionNote, setIsRedactionNote] = useState(false);
    const isAuth = useAppSelector(state => state.user.isAuth)
    const isActiveTheme = useAppSelector(state => state.themes.activeTheme)

    return (
        <div className={st.wrapper}>
            <Themes />
            <Notes />
            {isRedactionNote
                ? <NoteRedactor onClickSave={setIsRedactionNote} />
                : <NoteTestDetail onClickEdit={setIsRedactionNote} />
            }
            {(!isAuth && !isActiveTheme) && <Signin />}
        </div>
    )
};

export default MainPage;
