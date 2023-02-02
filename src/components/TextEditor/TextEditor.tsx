import React from 'react';
import cn from 'classnames';
import { Editor } from 'draft-js';

import { useEditorApi } from './context';
import { BLOCK_RENDER_MAP, CUSTOM_STYLE_MAP } from './config';

import st from './TextEditor.module.scss';

export type TextEditorProps = {
    className?: string;
}

const TextEditor: React.FC<TextEditorProps> = ({ className }) => {
    const editorApi = useEditorApi();

    return (
        <div className={cn(st['text-editor'], className)}>
            <Editor
                placeholder='Введите ваш текст'
                editorState={editorApi.state}
                onChange={editorApi.onChange}
                blockRenderMap={BLOCK_RENDER_MAP}
                customStyleMap={CUSTOM_STYLE_MAP}
                handleKeyCommand={editorApi.handleKeyCommand}
            />
        </div>
    );
}

export default TextEditor;
