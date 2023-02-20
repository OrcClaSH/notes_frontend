import { FC } from 'react';
import Highlight from 'react-highlight';

import { useAppDispatch, useAppSelector } from '@/store/store';
import { ReactComponent as CopyImg } from '@/assets/img/copy.svg';
import { createMarkup } from '@/utils';

import st from './NoteTestDetail.module.scss';
import 'highlight.js/styles/atom-one-dark-reasonable.css'
import DotsActions from '@/components/DotsActions';
import { deleteNote, setNotesStatus } from '@/store/slices/notes/notesSlice';

interface INodeDetailProps {
    onClickEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const NoteDetail: FC = () => {
    const activeNote = useAppSelector(state => state.notes.activeNote);
    const dispatch = useAppDispatch()

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
                        <CopyImg className={st['note-detail__icon']} key={`${index}a`} />
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
                        {activeNote ? activeNote.title : "Note not selected"}
                    </h2>
                    {activeNote && <DotsActions
                        actions={[
                            { text: 'Edit', action: () => dispatch(setNotesStatus('edit')) },
                            { text: 'Delete', action: () => dispatch(deleteNote(activeNote.id))},
                        ]}
                    />}
                </div>
                {parseNoteText()}
            </div>
        </div>
    );
}

export default NoteDetail;
