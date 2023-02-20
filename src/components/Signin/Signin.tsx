import React, { FC, useState } from 'react';

import { useAppSelector, useAppDispatch } from '@/store/store';
import { login } from '@/store/slices/user/userSlice';

import st from './Signin.module.scss';

const Signin: FC = () => {
    const userError = useAppSelector(state => state.user.error);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useAppDispatch();

    const handleBtnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        dispatch(login({ username, password }))
    };

    return (
        <div className={st.signin}>
            <form className={st['signin-form']}>
                <div className={st['signin-form__input-wrapper']}>
                    <input
                        className={st['signin-form__input']}
                        name='name'
                        type="text"
                        autoComplete='off'
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                    />
                    <p className={st['signin-form__input-placeholder']}>Имя пользователя</p>
                </div>
                <div className={st['signin-form__input-wrapper']}>
                    <input
                        className={st['signin-form__input']}
                        name='password'
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    <p className={st['signin-form__input-placeholder']}>Пароль</p>
                </div>
                <button
                    className={st['signin-form__button']}
                    onClick={e => handleBtnClick(e)}
                    type='submit'
                >
                    Sign in
                </button>
            </form>
        </div>
    );
};

export default Signin;
