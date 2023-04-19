import { useAppSelector } from "@/store/store";
import { FC, PropsWithChildren } from "react";
import { useLocation, Navigate } from "react-router-dom";

const RequireAuth: FC<PropsWithChildren> = ({ children }) => {
    const location = useLocation();
    const isAuth = useAppSelector(state => state.user.isAuth);
    // const isAuth = true;

    if (!isAuth) {
        return <Navigate to='/' state={{ from: location }} />
    }

    return (
        <>
            {children}
        </>
    )

}

export { RequireAuth }
