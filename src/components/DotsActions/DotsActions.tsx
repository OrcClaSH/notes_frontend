import { FC, useState, useRef } from "react";

import st from './DotsActions.module.scss';

import { ReactComponent as DotsImg } from '@/assets/img/dots.svg';
import PopupActions from "../PopupActions";

interface IDotsActionsProps {
    actions: {
        text: string;
        action: React.Dispatch<React.SetStateAction<boolean>>;
    }[]
};

const DotsActions: FC<IDotsActionsProps> = ({ actions }) => {
    const [showMenu, setShowMenu] = useState(false);
    const menuWrapperRef = useRef<null | HTMLDivElement>(null);

    return (
        <div
            className={st.dots}
            onClick={() => setShowMenu(prev => !prev)}
            ref={menuWrapperRef}
        >
            <DotsImg className={st.dots__img} />
            <PopupActions
                isShow={showMenu}
                setShow={setShowMenu}
                actions={actions}
                wrapperRef={menuWrapperRef}
            />
        </div>
    )
};

export default DotsActions;
