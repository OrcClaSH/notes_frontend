import { FC, useState } from 'react';

import Signin from '@/components/Signin';
import { ReactComponent as DevnotesImg } from '@/assets/img/devnotes.svg';
import { ReactComponent as CurvedArrowImg } from '@/assets/img/curved_arrow.svg';

import st from './StartPage.module.scss';

const StartPage: FC = () => {
    const [signStatus, setSignStatus] = useState('');

    return (
        <div className={st.sign}>
            <div className={st['sign-side-logo']}>
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
                {signStatus === 'signin' && <Signin />}
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
