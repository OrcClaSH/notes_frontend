import { FC, useEffect, useState } from 'react';

import Signin from '@/components/Signin';
import Signup from '@/components/Signup';
import { getUser } from '@/store/slices/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { ReactComponent as DevnotesImg } from '@/assets/img/devnotes.svg';
import { ReactComponent as CurvedArrowImg } from '@/assets/img/curved_arrow.svg';

import st from './StartPage.module.scss';
import { useNavigate } from 'react-router-dom';

const StartPage: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const [signStatus, setSignStatus] = useState('');
    const isAuth = useAppSelector(state => state.user.isAuth);

    useEffect(() => {
        dispatch(getUser())
    }, []);

    useEffect(() => {
        if (isAuth) navigate('/notes')
    }, [isAuth])

    return (
        <div className={st.sign}>
            <div className={st['sign-side-logo']} onClick={() => setSignStatus('')}>
                <DevnotesImg className={st['sign-side-logo--text']} />
                <div className={st['sign-side-logo--dots']}>
                </div>
            </div>
            <div className={st.sign__content}>
                <h1 className={st['sign__content-title']}>
                    Useful free open-source code keeper from developers for developers
                </h1>
                {!signStatus && <div className={st['sign__content-buttons']}>
                    <button
                        className={st['sign__content-button']}
                        onClick={() => setSignStatus('signin')}
                    >
                        Sign in
                    </button>
                    <button
                        className={st['sign__content-button']}
                        onClick={() => setSignStatus('signup')}
                    >
                        Sign up
                    </button>
                </div>}
                {signStatus === 'signin' && <Signin setSignStatus={setSignStatus} />}
                {signStatus === 'signup' && <Signup setSignStatus={setSignStatus} />}
                <div className={st['sign__content-bottom']}>
                    <p>Follow us</p>
                    <CurvedArrowImg className={st['sign__content-bottom--img']} />
                    <button>Github</button>
                </div>
            </div>
        </div>
    )
};

export default StartPage;
