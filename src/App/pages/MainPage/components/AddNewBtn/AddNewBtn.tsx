import { FC } from 'react';

import { ReactComponent as PlusImg } from '@/assets/img/plus.svg'

import st from './AddNewBtn.module.scss';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setIsRedaction } from '@/store/slices/themes/themesSlice';

interface IAddNewBtnProps {
    buttonText: string;
};

const AddNewBtn: FC<IAddNewBtnProps> = ({ buttonText }) => {
    const dispatch = useAppDispatch();
    const isRedaction = useAppSelector(state => state.themes.isRedaction);

    return (
        <div className={st.add}>
            <div
                className={st.add__button}
                onClick={() => dispatch(setIsRedaction({isRedaction: !isRedaction}))}
            >
                <PlusImg className={st['add__icon']} />
                <p className={st['add__text']}>{buttonText}</p>
            </div>
        </div>
    )
};

export default AddNewBtn;
