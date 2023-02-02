import { FC, useEffect, useState } from 'react';

import Signin from '@/components/Signin';
import { useAppDispatch, useAppSelector } from '@/store/store';
import Themes from './components/Themes';
import { checkAuth } from '@/store/slices/user/userSlice';

import st from './MainPage.module.scss';
import Notes from './components/Notes';
import NoteDetail from './components/NoteDetail';
import NoteRedactor from './components/NoteRedactor';


const MainPage:FC = () => {
    const [isRedactionNote, setIsRedactionNote] = useState(false);
    const isAuth = useAppSelector(state => state.user.isAuth)
    const dispatch = useAppDispatch()

    return (
        <div className={st.wrapper}>
            <Themes />
            <Notes />
            {isRedactionNote ? <NoteRedactor /> : <NoteDetail />}
            {!isAuth && <Signin />}
        </div>
    )
};

export default MainPage;
