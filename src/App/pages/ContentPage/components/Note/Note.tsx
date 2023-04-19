import { FC } from "react";
import cn from "classnames";

import { createMarkup } from '@/utils';
import { useAppDispatch } from "@/store/store";
import { INote } from "@/store/slices/notes/types";
import { setActiveNote } from "@/store/slices/notes/notesSlice";

import st from './Note.module.scss';

interface INoteProps {
    note: INote;
    isActive: boolean;
}

const Note: FC<INoteProps> = ({ note, isActive }) => {
    const dispatch = useAppDispatch();
    const {id, author, theme, title, text, pub_date, is_public, hash_link} = note;
    const date = new Date(pub_date)
    const day = date.getDate();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const year = date.getFullYear();
    const noteClassName = cn(
        st.note,
        isActive ? st.active : '',
    );

    return (
        <div
            className={noteClassName}
            onClick={() => dispatch(setActiveNote(note))}
        >
            <time className={st.note__date}>{`${day}.${month}.${year}`}</time>
            <h2 className={st.note__title}>{title}</h2>
            {/* <p className={st.note__text}>{text}</p> */}
            <p className={st.note__text} dangerouslySetInnerHTML={createMarkup(text)}></p>
        </div>
    )
};

export default Note;
