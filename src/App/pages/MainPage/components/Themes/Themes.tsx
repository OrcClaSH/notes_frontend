import { FC, useEffect, useState, useRef } from "react";

import Theme from "../Theme";
import Search from "@/components/Search";
import AddNewBtn from "../AddNewBtn/AddNewBtn";
import InputTheme from "@/components/InputTheme";
import PopupActions from "@/components/PopupActions";
import { logout } from "@/store/slices/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { ReactComponent as ArrowImg } from '@/assets/img/arrow.svg';
import { setRedactionTheme, fetchThemes, setActiveTheme } from "@/store/slices/themes/themesSlice";

import st from './Themes.module.scss';

const Themes: FC = () => {
    const [showUserMenu, setShowUserMenu] = useState(false);
    const iconWrapperRef = useRef<null | HTMLDivElement>(null)
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
                    <div
                        className={st['themes__header-icon--wrapper']}
                        onClick={() => setShowUserMenu(prev => !prev)}
                        ref={iconWrapperRef}
                        >
                        <ArrowImg className={st['themes__header-icon']} />
                        <PopupActions
                            isShow={showUserMenu}
                            setShow={setShowUserMenu}
                            wrapperRef={iconWrapperRef}
                            actions={[
                                { text: 'Logout', action: () => dispatch(logout()) }
                            ]}
                        />
                    </div>
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
                    onClick={() => dispatch(setRedactionTheme({ isRedaction: !isRedaction }))}
                />
                <InputTheme placeholder='Theme name' />
            </div>
        </section>
    )
};

export default Themes;
