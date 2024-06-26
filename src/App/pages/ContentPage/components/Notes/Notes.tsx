import { FC, useEffect, useState, useCallback } from "react";
import debounce from "lodash.debounce";

import Note from "../Note/Note";
import AddNewBtn from "../AddNewBtn";
import Search from "@/components/Search";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { selectorNotesWithActiveTheme } from "@/store/selectors";
import { fetchNotes, searchNotes, setActiveNote, setNotesStatus } from "@/store/slices/notes/notesSlice";

import st from './Notes.module.scss';

const Notes: FC = () => {
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(state => state.user.isAuth)
    const activeTheme = useAppSelector(state => state.themes.activeTheme)
    const activeNote = useAppSelector(state => state.notes.activeNote);
    const notes = useAppSelector(selectorNotesWithActiveTheme(activeTheme))
    const [searchValue, setSearchValue] = useState('')

    const handleActiveNote = (id: number) => {
        if (activeNote) {
            return activeNote.id === id;
        }
        return false;
    };

    const debounceSearch = useCallback(
        debounce((searchText: string) => {
            dispatch(searchNotes(searchText));
        }, 500),
        []
    );

    useEffect(() => {
        dispatch(fetchNotes(''))
    }, [isAuth, activeTheme]);

    useEffect(() => {
        const minNoteID = Math.min(...notes.map(note => note.id))
        const [activeNote] = notes.filter(note => note.id === minNoteID)
        dispatch(setActiveNote(activeNote))
    }, [activeTheme]);

    useEffect(() => {
        debounceSearch(searchValue);
    }, [searchValue]);

    return (
        <section className={st.notes}>
            <div className={st.notes__wrapper}>
                <div className={st.notes__header}>
                    <h2 className={st['notes__header-title']}>
                        {activeTheme.title ?? 'choice theme'}
                    </h2>
                </div>
                <Search
                    placeholder="Search notes"
                    value={searchValue}
                    setValue={setSearchValue}
                />
                <div className={st.notes__items}>
                    <div className={st['notes__items-wrapper']}>
                        {notes.map(note => (
                            <Note
                                note={note}
                                isActive={handleActiveNote(note.id)}
                                key={note.id}
                            />
                        ))}
                    </div>
                </div>
                <AddNewBtn
                    buttonText="Add new note"
                    onClick={() => dispatch(setNotesStatus('create'))}
                />
            </div>
        </section>
    )
};

export default Notes;
