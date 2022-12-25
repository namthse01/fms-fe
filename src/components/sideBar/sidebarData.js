import React from "react";
import ReceiptIcon from '@mui/icons-material/Receipt';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

export const sidebarData = [


    {
        title: "Dash board",
        icon: <DashboardIcon />,
        link: "/manager/dashboard"
    },

    {
        title: "Đơn Hàng",
        icon: <ReceiptIcon />,
        link: "/manager/order"
    },

    {
        title: "Khách hàng",
        icon: <PeopleIcon />,
        link: "/manager/Customer"
    },

    {
        title: "Nhân viên",
        icon: <SupportAgentIcon />,
        link: "/manager/Staff"
    },

    {
        title: "Dịch vụ",
        icon: <DesignServicesIcon />,
        link: "/admin/Service"
    },
    {
        title: "Tài khoản",
        icon: <ManageAccountsIcon />,
        link: "/admin/Account"
    }
]