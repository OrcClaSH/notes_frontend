import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { getUser } from "@/store/slices/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";

export const useAuth = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isRenderedRef = useRef<null | boolean>(null)
    const isAuth = useAppSelector(state => state.user.isAuth);

    useEffect(() => {
        dispatch(getUser());
        isRenderedRef.current = true;
    }, []);

    useEffect(() => {
        if (isAuth) navigate('/notes');
    }, [isAuth]);

    return {isAuth, isRendered: isRenderedRef.current};
};
