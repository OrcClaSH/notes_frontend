import { Outlet } from "react-router-dom";

// TODO
const MainLayout = () => {

    return (
        <div className='wrapper'>
            <Outlet />
        </div>
    )
}

export default MainLayout;
