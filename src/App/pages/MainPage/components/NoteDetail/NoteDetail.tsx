import { FC, useEffect } from "react";
import Highlight from 'react-highlight'

import { useAppSelector } from "@/store/store";
import { ReactComponent as DotsImg } from '@/assets/img/dots.svg';
import { ReactComponent as CopyImg } from '@/assets/img/copy.svg';

import st from './NoteDetail.module.scss';
import 'highlight.js/styles/atom-one-dark-reasonable.css'

const NoteDetail: FC = () => {
    const activeNote = useAppSelector(state => state.notes.activeNote);

    const parseNoteText = () => {
        if (!activeNote || !activeNote.text) return null;

        const textSplit = activeNote.text.split("<code>");

        const result = textSplit.map((item, index) => {

            if (!item.includes("</code>")) {
                return <p className={st["note-detail__text"]}>{item}</p>;
            }

            const parsedText = item.split("</code>")

            const code = parsedText[0].trim();
            const text = parsedText[1].trim();
            return (
                <>
                    <div className={st['note-detail__code-wrapper']}>
                        <Highlight
                            className={st['note-detail__code']}
                            key={index}
                        >
                            {code}
                        </Highlight>
                        <CopyImg className={st['note-detail__icon']} />
                    </div>
                    <p className={st["note-detail__text"]}>{text}</p>
                </>
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
                    {activeNote && <DotsImg className={st['note-detail__icon']} />}
                </div>
                {parseNoteText()}
            </div>
        </div>
    );
};

export default NoteDetail;
