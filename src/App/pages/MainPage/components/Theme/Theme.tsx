import { FC } from "react";

import cn from 'classnames';

import st from './Theme.module.scss';

import { ReactComponent as DotsIcon } from '@/assets/img/dots.svg';
import { useAppDispatch } from "@/store/store";
import { setActiveTheme } from "@/store/slices/themes/themesSlice";
import { ITheme } from "@/store/slices/themes/types";

interface IThemeProps {
    theme: ITheme
    isActive: boolean;
}

const Theme: FC<IThemeProps> = ({ theme, isActive }) => {
    const dispatch = useAppDispatch();
    const themeCN  = cn(
        st.theme,
        isActive ? st.active : '',
    )

    return (
        <div
            className={themeCN}
            onClick={() => dispatch(setActiveTheme(theme))}
        >
            <h2 className={st.theme__name}>{theme.title}</h2>
            {!isActive && <DotsIcon className={st.theme__icon} />}
        </div>
    )
}

export default Theme;
