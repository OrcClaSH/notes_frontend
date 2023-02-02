import { FC } from "react";

import ToolPanel from "@/components/ToolPanel";
import TextEditor from "@/components/TextEditor";
import { TextEditorProvider } from "@/components/TextEditor/context";

import st from './NoteRedactor.module.scss';


const NoteRedactor: FC = () => {
    return (
        <div className={st['note-redactor']}>
            <TextEditorProvider>
                <ToolPanel />
                <TextEditor />
            </TextEditorProvider>
        </div>
    )
}

export default NoteRedactor;
