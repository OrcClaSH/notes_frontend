import { FC, useState, useRef} from 'react';

import PopupActions from "@/components/PopupActions";
import { logout } from "@/store/slices/user/userSlice";
import { ReactComponent as ArrowImg } from '@/assets/img/arrow.svg';
import { useAppDispatch } from '@/store/store';

import st from './ThemesUserMenu.module.scss';

export const ThemesUserMenu: FC = () => {
    const [showUserMenu, setShowUserMenu] = useState(false);
    const iconWrapperRef = useRef<null | HTMLDivElement>(null)
    const dispatch = useAppDispatch();

    return (
        <div
            className={st['user-menu']}
            onClick={() => setShowUserMenu(prev => !prev)}
            ref={iconWrapperRef}
        >
            <ArrowImg className={st['user-menu__icon']} />
            <PopupActions
                isShow={showUserMenu}
                setShow={setShowUserMenu}
                wrapperRef={iconWrapperRef}
                actions={[
                    { text: 'Logout', action: () => dispatch(logout()) }
                ]}
            />
        </div>
    )
};

export default ThemesUserMenu;
