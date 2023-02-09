import { FC } from "react";

import cn from 'classnames';

import st from './Theme.module.scss';

import { useAppDispatch } from "@/store/store";
import { deleteTheme, patchTheme, setActiveTheme, setIsRedaction } from "@/store/slices/themes/themesSlice";
import { ITheme } from "@/store/slices/themes/types";
import DotsActions from "@/components/DotsActions";

interface IThemeProps {
    theme: ITheme
    isActive: boolean;
}

const Theme: FC<IThemeProps> = ({ theme, isActive }) => {
    const dispatch = useAppDispatch();
    const themeCN = cn(
        st.theme,
        isActive ? st.active : '',
    );

    const handleEditTheme = () => {
        dispatch(setIsRedaction({ isRedaction: true, theme }));
    };

    return (
        <div
            className={themeCN}
            onClick={() => dispatch(setActiveTheme(theme))}
        >
            <h2 className={st.theme__name}>{theme.title}</h2>

            <DotsActions
                actions={[
                    { text: 'Edit', action: handleEditTheme },
                    { text: 'Delete', action: () => dispatch(deleteTheme(theme.id)) }
                ]} />
        </div>
    )
};

export default Theme;
