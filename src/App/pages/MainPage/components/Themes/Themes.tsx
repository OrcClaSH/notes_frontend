import { FC, useEffect, useState, useRef } from "react";

import st from './Themes.module.scss';

import { ReactComponent as ArrowImg } from '@/assets/img/arrow.svg';
import Search from "@/components/Search";
import Theme from "../Theme";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setRedactionTheme, fetchThemes, setActiveTheme } from "@/store/slices/themes/themesSlice";
import InputTheme from "@/components/InputTheme";
import AddNewBtn from "../AddNewBtn/AddNewBtn";

const Themes: FC = () => {
    const isAuth = useAppSelector(state => state.user.isAuth)
    const userName = useAppSelector(state => state.user.user.username)
    const themes = useAppSelector(state => state.themes.themes);
    const activeTheme = useAppSelector(state => state.themes.activeTheme);
    const isRedaction = useAppSelector(state => state.themes.isRedaction);

    const dispatch = useAppDispatch();

    const isActiveTheme = (id: number) => {
        if (activeTheme) {
            return activeTheme.id === id;
        }
        return false;
    }

    useEffect(() => {
        dispatch(fetchThemes(''))
    }, [isAuth]);

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
                    <h2 className={st['themes__header-title']}>
                        {userName || 'UserName'}
                    </h2>
                    <ArrowImg className={st['themes__header-icon']} />
                </div>
                <Search placeholder="Search themes" />
                <div className={st.themes__items}>
                    <div className={st['themes__items-wrapper']}>
                        {themes.map(theme => (
                            <Theme
                                theme={theme}
                                isActive={isActiveTheme(theme.id)}
                                key={theme.id}
                            />
                        ))}
                    </div>
                </div>
                <AddNewBtn
                    buttonText={'Add new theme'}
                    onClick={() => dispatch(setRedactionTheme({isRedaction: !isRedaction}))}
                />
                <InputTheme placeholder='Theme name' />
            </div>
        </section>
    )
};

export default Themes;
