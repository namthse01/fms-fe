import React from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../sideBar/Sidebar";

//SCSS
import './Layout.scss';

const Layout = () => {
    return (
        <>
            <Sidebar />
            <div className="page">
                <Outlet />
            </div>
        </>
    );

}


export default Layout;