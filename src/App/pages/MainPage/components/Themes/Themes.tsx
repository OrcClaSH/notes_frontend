import { FC, useEffect } from "react";

import st from './Themes.module.scss';

import { ReactComponent as ArrowImg } from '@/assets/img/arrow.svg';
import { ReactComponent as PlusImg } from '@/assets/img/plus.svg'
import Search from "@/components/Search";
import Theme from "../Theme";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchThemes, setActiveTheme } from "@/store/slices/themes/themesSlice";

const Themes: FC = () => {
    const userName = useAppSelector(state => state.user.user.username)
    const themes = useAppSelector(state => state.themes.themes);
    const activeTheme = useAppSelector(state => state.themes.activeTheme);
    const dispatch = useAppDispatch();

    const handleActiveTheme = (id: number) => {
        if (activeTheme) {
            return activeTheme.id === id;
        }
        return false;
    }

    useEffect(() => {
        dispatch(fetchThemes(''))
    }, []);

    useEffect(() => {
        if (!activeTheme?.id) {
            const minThemeID = Math.min(...themes.map(theme => theme.id))
            const [activeTheme] = themes.filter(theme => theme.id === minThemeID)
            dispatch(setActiveTheme(activeTheme))
        };
    }, [themes]);

    return (
        <section className={st.themes}>
            <div className={st.themes__wrapper}>
                <div className={st.themes__header}>
                    <h2 className={st['themes__header-title']}>{userName || 'UserName'}</h2>
                    <ArrowImg className={st['themes__header-icon']} />
                </div>
                <Search placeholder="Search themes" />
                <div className={st.themes__items}>
                    {themes.map(theme => (
                        <Theme
                            theme={theme}
                            isActive={handleActiveTheme(theme.id)}
                            key={theme.id}
                        />
                    ))}
                </div>
                <div className={st.themes__add}>
                    <PlusImg className={st['themes__add-icon']} />
                    <p className={st['themes__add-text']}>Add new theme</p>
                </div>
            </div>
        </section>
    )
};

export default Themes;
