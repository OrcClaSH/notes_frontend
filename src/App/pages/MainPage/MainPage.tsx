import { FC, useEffect } from 'react';

import Signin from '@/components/Signin';
import { useAppDispatch, useAppSelector } from '@/store/store';
import Themes from './components/Themes';
import { checkAuth } from '@/store/slices/user/userSlice';

import st from './MainPage.module.scss';
import Notes from './components/Notes';

const MainPage:FC = () => {
    const isAuth = useAppSelector(state => state.user.isAuth)
    const dispatch = useAppDispatch()

    return (
        <div className={st.wrapper}>
            <Themes />
            <Notes />
            {!isAuth && <Signin />}
        </div>
    )
};

export default MainPage;
