import { Outlet } from "react-router-dom";

// TODO
const MainLayout = () => {

    return (
        <main className="layout-container">
            <div className='wrapper'>
                <Outlet />
            </div>
        </main>
    )
}

export default MainLayout;
