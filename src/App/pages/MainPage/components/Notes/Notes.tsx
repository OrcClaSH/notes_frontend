import { FC, useState, useEffect } from "react";

import st from './Notes.module.scss';

import { ReactComponent as PlusImg } from '@/assets/img/plus.svg'
import Search from "@/components/Search";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchNotes, setActiveNote } from "@/store/slices/notes/notesSlice";
import Note from "../Note/Note";

const Notes: FC = () => {
    const activeTheme = useAppSelector(state => state.themes.activeTheme)
    const activeNote = useAppSelector(state => state.notes.activeNote);
    const notes = useAppSelector(
        state => state.notes.notes.filter(
            note => note.theme === activeTheme?.title?.toLowerCase()));
    const dispatch = useAppDispatch();

    const handleActiveNote = (id: number) => {
        if (activeNote) {
            return activeNote.id === id;
        }
        return false;
    };

    useEffect(() => {
        dispatch(fetchNotes(''))
    }, []);

    useEffect(() => {
        const minNoteID = Math.min(...notes.map(note => note.id))
        const [activeNote] = notes.filter(note => note.id === minNoteID)
        dispatch(setActiveNote(activeNote))
    }, [activeTheme]);

    return (
        <section className={st.notes}>
            <div className={st.notes__wrapper}>
                <div className={st.notes__header}>
                    <h2 className={st['notes__header-title']}>ActiveTheme</h2>
                </div>
                <Search placeholder="Search notes" />
                <div className={st.notes__items}>
                    {notes.map(note => (
                        <Note
                            note={note}
                            isActive={handleActiveNote(note.id)}
                            key={note.id}
                        />
                    ))}
                </div>
                <div className={st.notes__add}>
                    <PlusImg className={st['notes__add-icon']} />
                    <p className={st['notes__add-text']}>Add new note</p>
                </div>
            </div>
        </section>
    )
};

export default Notes;
