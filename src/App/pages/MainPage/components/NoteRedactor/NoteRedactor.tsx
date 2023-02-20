import { FC, useEffect, useState } from "react";

import ToolPanel from "@/components/ToolPanel";
import TextEditor from "@/components/TextEditor";
import { TextEditorProvider } from "@/components/TextEditor/context";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setActiveNote, setNotesStatus } from "@/store/slices/notes/notesSlice";

import st from './NoteRedactor.module.scss';

const NoteRedactor: FC = () => {
    const activeNote = useAppSelector(state => state.notes.activeNote)
    const notesStatus = useAppSelector(state => state.notes.status)
    const [noteTitle, setNoteTitle] = useState('')
    const dispatch = useAppDispatch()

    const onClickSave = () => {
        if (activeNote.title !== noteTitle) {
            dispatch(setActiveNote({ ...activeNote, title: noteTitle }))
        }
        dispatch(setNotesStatus('read'))
    }

    useEffect(() => {
        if (activeNote?.title && notesStatus === 'edit') {
            setNoteTitle(activeNote.title)
        }
    }, [activeNote]);

    return (
        <div className={st['note-redactor']}>
            <input
                className={st['note-redactor__title']}
                type='text'
                value={noteTitle}
                onChange={e => setNoteTitle(e.target.value)}
            />
            <TextEditorProvider>
                <ToolPanel onClickSave={onClickSave} modifiedNote={{ ...activeNote, title: noteTitle }} />
                <TextEditor />
            </TextEditorProvider>
            <button
                className={st['note-redactor__btn']}
                onClick={() => dispatch(setNotesStatus('read'))}
            >
                Cancel
            </button>
        </div>
    )
};

export default NoteRedactor;
