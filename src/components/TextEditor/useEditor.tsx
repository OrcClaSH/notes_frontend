import React from 'react';
import {
    EditorState,
    RichUtils,
    CompositeDecorator,
    DraftEntityMutability,
    DraftEditorCommand,
    DraftHandleValue,
    KeyBindingUtil,
    getDefaultKeyBinding,
    ContentState,
    convertToRaw
} from 'draft-js';

import { BlockType, EntityType, InlineStyle, KeyCommand } from './config';
import { HTMLtoState, stateToHTML } from "./convert";
import LinkDecorator from './Link';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { patchNote } from '@/store/slices/notes/notesSlice';

export type EditorApi = {
    state: EditorState;
    onChange: (state: EditorState) => void;
    toggleBlockType: (blockType: BlockType) => void;
    currentBlockType: BlockType;
    toHtml: () => string;
    toggleInlineStyle: (inlineStyle: InlineStyle) => void;
    hasInlineStyle: (inlineStyle: InlineStyle) => boolean;
    addLink: (url: string) => void;
    setEntityData: (entityKey: string, data: Record<string, string>) => void;
    handleKeyCommand: (
        command: KeyCommand,
        editorState: EditorState
    ) => DraftHandleValue;
    handlerKeyBinding: (e: React.KeyboardEvent) => KeyCommand | null;
    save: () => void;
};

const decorator = new CompositeDecorator([LinkDecorator]);

export const useEditor = (html?: string): EditorApi => {
    const dispatch = useAppDispatch();
    const currentNote = useAppSelector(state => state.notes.activeNote)
    const [state, setState] = React.useState(() =>
        html
            ? EditorState.createWithContent(HTMLtoState(html), decorator)
            : EditorState.createEmpty(decorator));

    const toggleBlockType = React.useCallback((blockType: BlockType) => {
        setState((currentState) => RichUtils.toggleBlockType(currentState, blockType))
    }, []);

    React.useEffect(() => {
        if (currentNote?.text) {
            // const content = ContentState.createFromText(currentNote.text);
            // const editorState = EditorState.createWithContent(content, decorator);
            const editorState = EditorState.createWithContent(HTMLtoState(currentNote.text), decorator);
            setState(editorState);
        }
    }, [currentNote])

    const currentBlockType = React.useMemo(() => {
        const selection = state.getSelection();
        const content = state.getCurrentContent();
        const block = content.getBlockForKey(selection.getStartKey());
        // console.log(block)
        return block.getType() as BlockType;
    }, [state])

    const toggleInlineStyle = React.useCallback((inlineStyle: InlineStyle) => {
        setState((currentState) => RichUtils.toggleInlineStyle(currentState, inlineStyle))
    }, [])

    const hasInlineStyle = React.useCallback((inlineStyle: InlineStyle) => {
        const currentStyle = state.getCurrentInlineStyle();
        return currentStyle.has(inlineStyle);
    }, [state])

    const setEntityData = React.useCallback((entityKey: string, data: Record<string, string>) => {
        setState((currentState) => {
            /* Получаем текущий контент */
            const content = currentState.getCurrentContent();
            /* Объединяем текущие данные Entity с новыми */
            const contentStateUpdated = content.mergeEntityData(entityKey, data);
            /* Обновляем состояние редактора с указанием типа изменения */
            return EditorState.push(
                currentState,
                contentStateUpdated,
                "apply-entity"
            );
        });
    }, []);

    const addEntity = React.useCallback((entityType: EntityType, data: Record<string, string>, mutability: DraftEntityMutability) => {
        setState((currentState) => {
            /* Получаем текущий контент */
            const contentState = currentState.getCurrentContent();
            /* Создаем Entity с данными */
            const contentStateWithEntity = contentState.createEntity(entityType, mutability, data);
            /* Получаем уникальный ключ Entity */
            const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
            /* Объединяем текущее состояние с новым */
            const newState = EditorState.set(currentState, { currentContent: contentStateWithEntity });
            /* Вставляем ссылку в указанное место */
            return RichUtils.toggleLink(newState, newState.getSelection(), entityKey);
        })
    }, []);

    const addLink = React.useCallback((url: string) => {
        addEntity(EntityType.link, { url }, 'MUTABLE')
    }, [addEntity]);

    const handleKeyCommand = React.useCallback(
        (command: KeyCommand, editorState: EditorState) => {
            if (command === "accent") {
                toggleInlineStyle(InlineStyle.ACCENT);
                return "handled";
            }

            const newState = RichUtils.handleKeyCommand(editorState, command);

            if (newState) {
                setState(newState);
                return "handled";
            }

            return "not-handled";
        },
        [toggleInlineStyle]
    );

    const handlerKeyBinding = React.useCallback((e: React.KeyboardEvent) => {
        /* Проверяем нажата ли клавиша q + ctrl/cmd */
        if (e.keyCode === 81 && KeyBindingUtil.hasCommandModifier(e)) {
            return 'accent';
        }
        return getDefaultKeyBinding(e);
    }, []);

    const toHtml = React.useCallback(
        () => stateToHTML(state.getCurrentContent()),
        [state]
    );

    const save = React.useCallback(
        () => {
            dispatch(patchNote({...currentNote, text: toHtml()}))
            // console.log(state.getCurrentContent().getAllEntities())
        }, [state]
    );

    return React.useMemo(() => ({
        state,
        onChange: setState,
        toggleBlockType,
        currentBlockType,
        toggleInlineStyle,
        hasInlineStyle,
        toHtml,
        addLink,
        setEntityData,
        handleKeyCommand,
        handlerKeyBinding,
        save,
    }), [
        state,
        toggleBlockType,
        currentBlockType,
        toggleInlineStyle,
        hasInlineStyle,
        toHtml,
        addLink,
        setEntityData,
        handleKeyCommand,
        handlerKeyBinding,
        save,
    ])
};
