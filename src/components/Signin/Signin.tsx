import { FC } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '@/store/store';
import { TFormSigninSchema } from '@/utils/types';
import { login } from '@/store/slices/user/userSlice';
import { formSigninSchema } from '@/utils/validations';

import st from './Signin.module.scss';

interface ISigninProps {
    setSignStatus: React.Dispatch<React.SetStateAction<string>>;
}

const Signin: FC<ISigninProps> = ({ setSignStatus }) => {
    const isAuth = useAppSelector(store => store.user.isAuth)
    const dispatch = useAppDispatch();

    const onSubmit: SubmitHandler<TFormSigninSchema> = (data) => {
        dispatch(login(data))
        reset()
        if (isAuth) setSignStatus('') // TODO checkAuth
    };

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors, isValid }
    } = useForm<TFormSigninSchema>({
        mode: 'onBlur',
        resolver: zodResolver(formSigninSchema)
    });

    return (
        <div className={st.signin}>
            <form
                className={st['signin-form']}
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className={st['signin-form__input-wrapper']}>
                    <input
                        {...register('username')}
                        className={st['signin-form__input']}
                        autoComplete='off'
                        required
                    />
                    <p className={st['signin-form__input-placeholder']}>Username</p>
                    {errors.username && (
                        <span
                            className={st['signin-form__error']}
                            role='alert'
                        >
                            {errors.username?.message}
                        </span>
                    )}
                </div>
                <div className={st['signin-form__input-wrapper']}>
                    <input
                        {...register('password')}
                        className={st['signin-form__input']}
                        type="password"
                        required
                    />
                    <p className={st['signin-form__input-placeholder']}>Password</p>
                    {errors.password && (
                        <span
                            className={st['signin-form__error']}
                            role='alert'
                        >
                            {errors.password?.message}
                        </span>
                    )}
                </div>
                <button
                    className={st['signin-form__button']}
                    type='submit'
                    disabled={!isValid}
                >
                    Sign in
                </button>
            </form>
        </div>
    );
};

export default Signin;
