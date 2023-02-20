import React, { FC, useEffect, useRef } from 'react';

import cn from 'classnames';

import st from './PopupActions.module.scss';

interface IPopupActionsProps {
    isShow: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    wrapperRef: React.MutableRefObject<HTMLDivElement | null>
    actions: {
        text: string;
        action: React.Dispatch<React.SetStateAction<boolean>>;
    }[]
};

const PopupActions: FC<IPopupActionsProps> = ({ actions, isShow, setShow, wrapperRef }) => {
    const popupRef = useRef<null | HTMLDivElement>(null)
    let classesActions = cn(
        st.actions,
        isShow ? st.active : ''
    )

    useEffect(() => {
        const handleDocumentClick = (e: MouseEvent) => {
            if (wrapperRef?.current
                && !wrapperRef.current.contains(e.target as Node)
            ) {
                setShow(false)
            };
        };

        document.addEventListener('click', handleDocumentClick);
        return () => document.removeEventListener('click', handleDocumentClick);
    }, [popupRef])

    return (
        <div className={classesActions} ref={popupRef}>
            <div className={st.actions__items}>
                {actions.map(item => (
                    <span
                        className={st.actions__item}
                        key={item.text}
                        onClick={() => item.action(true)}
                    >
                        {item.text}
                    </span>))}
            </div>
        </div>
    );
};

export default PopupActions;
