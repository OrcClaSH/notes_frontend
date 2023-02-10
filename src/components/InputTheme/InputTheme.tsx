import { FC, useEffect, useState } from 'react';
import cn from 'classnames';

import st from './InputTheme.module.scss';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { createTheme, patchTheme, setRedactionTheme } from '@/store/slices/themes/themesSlice';

interface IAddNewProps {
    placeholder: string;
};

const InputTheme: FC<IAddNewProps> = ({ placeholder }) => {
    const dispatch = useAppDispatch()
    const isRedaction = useAppSelector(state => state.themes.isRedaction);
    const redactionTheme = useAppSelector(state => state.themes.redactionTheme);
    const [title, setTitle] = useState('')

    const addCN = cn(
        st['input-modal'],
        isRedaction ? st.active : null,
    );

    const handleCreateOrChange = () => {
        if (!redactionTheme.title && title) {
            dispatch(createTheme({ title }))
        } else {
            dispatch(patchTheme({...redactionTheme, title}))
        }
        dispatch(setRedactionTheme({ isRedaction: false }))
        setTitle('')
    };

    useEffect(() => {
        if (redactionTheme?.title) {
            setTitle(redactionTheme.title)
        } else {
            setTitle('')
        }
    }, [redactionTheme]);

    return (
        <div className={addCN}>
            <input
                className={st['input-modal__input']}
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={placeholder}
            />
            <div className={st['input-modal-buttons']}>
                <button onClick={handleCreateOrChange}>✔️</button>
                <button onClick={() => dispatch(setRedactionTheme({ isRedaction: false }))}>❌</button>
            </div>
        </div>

    )
};

export default InputTheme;
