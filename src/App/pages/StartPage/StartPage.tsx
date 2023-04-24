import { FC } from 'react';

import Signin from '@/components/Signin';
import Signup from '@/components/Signup';
import { ReactComponent as DevnotesImg } from '@/assets/img/devnotes.svg';
import { ReactComponent as CurvedArrowImg } from '@/assets/img/curved_arrow.svg';

import st from './StartPage.module.scss';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setSignStatus } from '@/store/slices/user/userSlice';

const StartPage: FC = () => {
    const dispatch = useAppDispatch();
    const signStatus = useAppSelector(store => store.user.signStatus)

    return (
        <div className={st.sign}>
            <div className={st['sign-side-logo']} onClick={() => dispatch(setSignStatus(''))}>
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
                        onClick={() => dispatch(setSignStatus('signin'))}
                    >
                        Sign in
                    </button>
                    <button
                        className={st['sign__content-button']}
                        onClick={() => dispatch(setSignStatus('signup'))}
                    >
                        Sign up
                    </button>
                </div>}
                {signStatus === 'signin' && <Signin />}
                {signStatus === 'signup' && <Signup />}
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
