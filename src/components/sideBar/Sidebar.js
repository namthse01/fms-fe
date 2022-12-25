import React from 'react';
import './Sidebar.scss';
import { sidebarData } from './sidebarData';
import { useNavigate } from "react-router-dom";

import defaultUserAvatar from "../../assets/images/login.png";

//icons 
import LogoutIcon from '@mui/icons-material/Logout';

const Sidebar = () => {

    const navigate = useNavigate();


    return (
        <div className="sidebar-container">
            <div className='sidebar-head'>
                <div
                    style={{ textAlign: "center" }}
                >
                    <img src={defaultUserAvatar} alt="avatar" className='img-control' />
                </div>
                <div
                    style={{ fontSize: "20px", fontWeight: "500", color: 'white' }}
                    className="text-center"
                >
                    Tran Hoang Nam
                </div>
            </div>
            <ul className='sidebar-list'>
                {sidebarData.map((val, key) => {
                    return (
                        <li
                            className='sideBar-row'
                            key={key}
                            id={window.location.pathname === val.link ? "active" : ""}
                            onClick={() => { window.location.pathname = val.link }}
                        >
                            {""}
                            <div className='sidebar-icon'>{val.icon}</div> {""}
                            <div className='sidebar-title'>
                                {val.title}
                            </div>
                        </li>
                    );
                })}
            </ul>
            <div className="side-bar-bottom">
                <div
                    className='bottom-content'
                    onClick={() => {
                        navigate('/');
                    }}>
                    <div>Đăng xuất</div>
                    <div><LogoutIcon /></div>
                </div>
            </div>
        </div>
    );
}



export default Sidebar;