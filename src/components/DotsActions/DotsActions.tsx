import { FC } from "react";

import st from './DotsActions.module.scss';

import { ReactComponent as DotsImg } from '@/assets/img/dots.svg';

interface IDotsActionsProps {
    actions: {
        text: string;
        action: React.Dispatch<React.SetStateAction<boolean>>;
    }[]
};

const DotsActions: FC<IDotsActionsProps> = ({ actions }) => {

    return (
        <div className={st.dots}>
            <DotsImg className={st.dots__img} />
            <div className={st.dots__actions}>
                {!!actions.length && (
                    <div className={st['dots__actions-items']}>
                        {actions.map(item => (
                            <span
                                className={st['dots__actions-item']}
                                key={item.text}
                                onClick={() => item.action(true)}
                            >
                                {item.text}
                            </span>))}
                    </div>
                )}
            </div>
        </div>
    )
};

export default DotsActions;
