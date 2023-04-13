import { FC, memo } from "react";

import cn from 'classnames';

import st from './Theme.module.scss';

import { useAppDispatch } from "@/store/store";
import { deleteTheme, setActiveTheme, setRedactionTheme } from "@/store/slices/themes/themesSlice";
import { ITheme } from "@/store/slices/themes/types";
import DotsActions from "@/components/DotsActions";

// import { useWhyDidYouUpdate } from 'ahooks';

interface IThemeProps {
    theme: ITheme
    isActive: boolean;
}

const Theme: FC<IThemeProps> = ({ theme, isActive }) => {
    const dispatch = useAppDispatch();
    const classesTheme = cn(
        st.theme,
        isActive ? st.active : '',
    );

    const handleEditTheme = () => {
        dispatch(setRedactionTheme({ isRedaction: true, theme }));
    };

    const handleDeleteTheme = () => {
        dispatch(deleteTheme(theme.id))
    };

    return (
        <div
            className={classesTheme}
            onClick={() => dispatch(setActiveTheme(theme))}
        >
            <h2 className={st.theme__name}>{theme.title}</h2>

            <DotsActions
                actions={[
                    { text: 'Edit', action: handleEditTheme },
                    { text: 'Delete', action: handleDeleteTheme }
                ]}
            />
        </div>
    )
};

export default memo(Theme);
