import { useEffect, useRef } from "react";

import { getUser } from "@/store/slices/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";

export const useAuth = () => {
    const dispatch = useAppDispatch();
    const isRenderedRef = useRef<null | boolean>(null)
    const isAuth = useAppSelector(state => state.user.isAuth);

    useEffect(() => {
        dispatch(getUser());
        isRenderedRef.current = true;
    }, []);

    return {isAuth, isRendered: isRenderedRef.current};
};
