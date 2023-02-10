import { FC } from 'react';

import { ReactComponent as PlusImg } from '@/assets/img/plus.svg'

import st from './AddNewBtn.module.scss';

interface IAddNewBtnProps {
    buttonText: string;
    onClick: () => void;
};

const AddNewBtn: FC<IAddNewBtnProps> = ({ buttonText, onClick }) => {

    return (
        <div className={st.add}>
            <div
                className={st.add__button}
                onClick={onClick}
            >
                <PlusImg className={st['add__icon']} />
                <p className={st['add__text']}>{buttonText}</p>
            </div>
        </div>
    )
};

export default AddNewBtn;
