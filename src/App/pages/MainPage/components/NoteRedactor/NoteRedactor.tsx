import { FC } from "react";

import ToolPanel from "@/components/ToolPanel";
import TextEditor from "@/components/TextEditor";
import { TextEditorProvider } from "@/components/TextEditor/context";

import st from './NoteRedactor.module.scss';

interface INoteRedactorProps {
    onClickSave: React.Dispatch<React.SetStateAction<boolean>>;
}

const NoteRedactor: FC<INoteRedactorProps> = ({ onClickSave }) => {
    return (
        <div className={st['note-redactor']}>
            <TextEditorProvider>
                <ToolPanel onClickSave={onClickSave}/>
                <TextEditor />
            </TextEditorProvider>
        </div>
    )
}

export default NoteRedactor;
