import React from 'react';
import cn from 'classnames';

import { InlineStyle, BlockType } from '../TextEditor/config';
import { useEditorApi } from '../TextEditor/context';

import st from './ToolPanel.module.scss';
import { useAppDispatch } from '@/store/store';
import { setTextActiveNote } from '@/store/slices/notes/notesSlice';

const ToolPanel: React.FC = () => {
    const dispatch = useAppDispatch();

    const {
        addLink,
        toHtml,
        toggleBlockType,
        currentBlockType,
        toggleInlineStyle,
        hasInlineStyle,
        save,
    } = useEditorApi();

    return (
        <div className={st['tool-panel']}>

            <button
                className={cn(
                    st['tool-panel__item'],
                    currentBlockType === BlockType.h1 && st['tool-panel__item_active']
                )}
                onMouseDown={(e) => {
                    e.preventDefault();
                    toggleBlockType(BlockType.h1);
                }}
            >
                Заголовок
            </button>

            <button
                className={cn(
                    st['tool-panel__item'],
                    currentBlockType === BlockType.h2 && st['tool-panel__item_active']
                )}
                onMouseDown={(e) => {
                    e.preventDefault();
                    toggleBlockType(BlockType.h2);
                }}
            >
                Подзаголовок
            </button>

            <button
                className={cn(
                    st['tool-panel__item'],
                    currentBlockType === BlockType.cite && st['tool-panel__item_active']
                )}
                onMouseDown={(e) => {
                    e.preventDefault();
                    toggleBlockType(BlockType.cite);
                }}
            >
                Сноска
            </button>

            <button
                className={cn(
                    st['tool-panel__item'],
                    currentBlockType === BlockType.default && st['tool-panel__item_active']
                )}
                onMouseDown={(e) => {
                    e.preventDefault();
                    toggleBlockType(BlockType.default);
                }}
            >
                Простой
            </button>

            {Object.values(InlineStyle).map((v) => (
                <button
                    key={v}
                    className={cn(
                        st['tool-panel__item'],
                        hasInlineStyle(v) && st['tool-panel__item_active']
                    )}
                    onMouseDown={(e) => {
                        e.preventDefault();
                        toggleInlineStyle(v);
                    }}
                >
                    {v}
                </button>
            ))}

            <button
                className={st['tool-panel__item']}
                onClick={() => {
                    const url = prompt("URL:");
                    if (url) {
                        addLink(url);
                    }
                }}
            >
                LINK
            </button>

            <button
                className={st['tool-panel__item']}
                onClick={() => {
                    console.log(toHtml());
                }}
            >
                Export to HTML
            </button>

            <button
                className={cn(
                    st['tool-panel__item'],
                    currentBlockType === BlockType.code && st['tool-panel__item_active']
                )}
                onMouseDown={(e) => {
                    e.preventDefault();
                    toggleBlockType(BlockType.code);
                }}
            >
                Code
            </button>

            <button
                onClick={() => {
                    dispatch(setTextActiveNote(toHtml()))
                }}
            >
                Save
            </button>

        </div>
    );
};

export default ToolPanel;
