import { FC } from 'react';
import Highlight from 'react-highlight';

import { createMarkup } from '@/utils';
import DotsActions from '@/components/DotsActions';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { ReactComponent as CopyImg } from '@/assets/img/copy.svg';
import { deleteNote, setNotesStatus } from '@/store/slices/notes/notesSlice';
import { useClipboard } from 'use-clipboard-copy';
import { ToastContainer, toast } from 'react-toastify';

import 'highlight.js/styles/atom-one-dark-reasonable.css'
import 'react-toastify/dist/ReactToastify.css';
import st from './NoteTestDetail.module.scss';

const NoteDetail: FC = () => {
    const activeNote = useAppSelector(state => state.notes.activeNote);
    const dispatch = useAppDispatch()
    const clipboard = useClipboard();

    const parseNoteText = () => {
        if (!activeNote || !activeNote.text) return null;

        const textSplit = activeNote.text
            .replaceAll('</pre><pre>', '\n')
            .split("<pre>");

        const result = textSplit.map((item, index) => {
            if (!item.includes("</pre>")) {
                return (
                    <div
                        className={st["note-detail__text"]}
                        dangerouslySetInnerHTML={createMarkup(item)}
                        key={index}
                    />
                )
            }

            const parsedText = item.split("</pre>")
            const code = parsedText[0]
                .trim()
                .replaceAll('&#x27;', '"')
                .replaceAll('&quot;', '"')
                .replaceAll('=&gt;', '=>')
                .replaceAll('<br/>', '\n') // TODO replace all replace
            const text = parsedText[1].trim();

            const copyToClipboard = (text: string) => {
                if (navigator.clipboard && window.isSecureContext) {
                    navigator.clipboard.writeText(text)
                } else {
                    clipboard.copy(text)
                }
                toast('Copied')
            };

            return (
                <div
                    key={`${index}b`}
                >
                    <div className={st['note-detail__code-wrapper']}>
                        <Highlight
                            className={st['note-detail__code']}
                            key={index}
                        >
                            {code}
                        </Highlight>
                        <CopyImg
                            className={st['note-detail__icon']}
                            key={`${index}a`}
                            onClick={() => copyToClipboard(code)}
                        />
                    </div>
                    <div
                        className={st["note-detail__text"]}
                        dangerouslySetInnerHTML={createMarkup(text)}
                    />
                </div>
            );
        });

        return result;
    };

    return (
        <div className={st['note-detail']}>
            <div className={st['note-detail__wrapper']}>
                <div className={st['note-detail__header']}>
                    <h2 className={st['note-detail__header-title']}>
                        {activeNote?.title ? activeNote.title : "Note not selected"}
                    </h2>
                    {activeNote?.title && <DotsActions
                        actions={[
                            { text: 'Edit', action: () => dispatch(setNotesStatus('edit')) },
                            { text: 'Delete', action: () => dispatch(deleteNote(activeNote.id)) },
                        ]}
                    />}
                </div>
                {parseNoteText()}
                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
            </div>
        </div>
    );
}

export default NoteDetail;
