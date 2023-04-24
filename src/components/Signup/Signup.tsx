import { FC } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '@/store/store';
import { TFormSignupSchema } from '@/utils/types';
import { registration, setSignStatus } from '@/store/slices/user/userSlice';
import { formSignupSchema } from '@/utils/validations';

import st from './Signup.module.scss';

const Signup: FC = () => {
    const dispatch = useAppDispatch();

    const onSubmit: SubmitHandler<TFormSignupSchema> = (data) => {
        dispatch(registration(data))
        reset()
        dispatch(setSignStatus('signin')) // TODO checkAuth
    };

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors, isValid }
    } = useForm<TFormSignupSchema>({
        mode: 'onBlur',
        resolver: zodResolver(formSignupSchema)
    });

    return (
        <div className={st.signup}>
            <form
                className={st['signup-form']}
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className={st['signup-form__input-wrapper']}>
                    <input
                        {...register('username')}
                        className={st['signup-form__input']}
                        autoComplete='off'
                        required
                    />
                    <p className={st['signup-form__input-placeholder']}>Username</p>
                    {errors.username && (
                        <span
                            className={st['signup-form__error']}
                            role='alert'
                        >
                            {errors.username?.message}
                        </span>
                    )}
                </div>
                <div className={st['signup-form__input-wrapper']}>
                    <input
                        {...register('password')}
                        className={st['signup-form__input']}
                        type="password"
                        required
                    />
                    <p className={st['signup-form__input-placeholder']}>Password</p>
                    {errors.password && (
                        <span
                            className={st['signup-form__error']}
                            role='alert'
                        >
                            {errors.password?.message}
                        </span>
                    )}
                </div>
                <div className={st['signup-form__input-wrapper']}>
                    <input
                        {...register('confirmPassword')}
                        className={st['signup-form__input']}
                        type="password"
                        required
                    />
                    <p className={st['signup-form__input-placeholder']}>Confirm password</p>
                    {errors.confirmPassword && (
                        <span
                            className={st['signup-form__error']}
                            role='alert'
                        >
                            {errors.confirmPassword?.message}
                        </span>
                    )}
                </div>
                <button
                    className={st['signup-form__button']}
                    type='submit'
                    disabled={!isValid}
                >
                    Sign up
                </button>
            </form>
        </div>
    );
};

export default Signup;
