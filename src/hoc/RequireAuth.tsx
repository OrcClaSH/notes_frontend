import { FC, PropsWithChildren } from "react";
import { useLocation, Navigate } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";

const RequireAuth: FC<PropsWithChildren> = ({ children }) => {
    const location = useLocation();
    const {isAuth, isRendered} = useAuth();

    if (!isAuth && isRendered) {
        return <Navigate to='/' state={{ from: location }} />
    }

    return (
        <>
            {children}
        </>
    )
}

export { RequireAuth }
