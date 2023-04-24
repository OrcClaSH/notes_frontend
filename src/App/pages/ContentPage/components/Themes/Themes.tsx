import { FC, useEffect, useState, memo } from "react";

import Theme from "../Theme";
import Search from "@/components/Search";
import AddNewBtn from "../AddNewBtn/AddNewBtn";
import ThemesUserMenu from "../ThemesUserMenu";
import InputTheme from "@/components/InputTheme";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setRedactionTheme, fetchThemes, searchThemes } from "@/store/slices/themes/themesSlice";

import st from './Themes.module.scss';

// import { useWhyDidYouUpdate } from 'ahooks';

const Themes: FC = () => {
    const isAuth = useAppSelector(state => state.user.isAuth)
    const userName = useAppSelector(state => state.user.user.username)
    const themes = useAppSelector(state => state.themes.themes);
    const isRedaction = useAppSelector(state => state.themes.isRedaction);
    const [searchValue, setSearchValue] = useState('')
    const activeTheme = useAppSelector(state => state.themes.activeTheme);
    const dispatch = useAppDispatch();

    const isActiveTheme = (id: number) => {
        if (activeTheme) {
            return activeTheme.id === id;
        }
        return false;
    };

    useEffect(() => {
        dispatch(fetchThemes(''))
    }, [isAuth]);

    useEffect(() => {
        dispatch(searchThemes(searchValue));
    }, [searchValue]);

    return (
        <section className={st.themes}>
            <div className={st.themes__wrapper}>
                <div className={st.themes__header}>
                    <h2 className={st['themes__header-title']}>
                        {userName || 'UserName'}
                    </h2>
                    <ThemesUserMenu />
                </div>
                <Search
                    placeholder="Search themes"
                    value={searchValue}
                    setValue={setSearchValue}
                />
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
                    onClick={() => dispatch(setRedactionTheme({ isRedaction: !isRedaction }))}
                />
                <InputTheme placeholder='Theme name' />
            </div>
        </section>
    )
};

export default Themes;
