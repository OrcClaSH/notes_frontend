import { FC } from "react";

import ToolPanel from "@/components/ToolPanel";
import TextEditor from "@/components/TextEditor";
import { TextEditorProvider } from "@/components/TextEditor/context";

import st from './NoteRedactor.module.scss';
import { useAppSelector } from "@/store/store";

interface INoteRedactorProps {
    onClickSave: React.Dispatch<React.SetStateAction<boolean>>;
}

const NoteRedactor: FC<INoteRedactorProps> = ({ onClickSave }) => {
    const activeNote = useAppSelector(state => state.notes.activeNote)

    return (
        <div className={st['note-redactor']}>
            <h2 className={st['note-redactor__title']}>{activeNote?.title}</h2>
            <TextEditorProvider>
                <ToolPanel onClickSave={onClickSave}/>
                <TextEditor />
            </TextEditorProvider>
        </div>
    )
};

export default NoteRedactor;
