import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Layout from './components/layout/Layout';

import Login from "./components/login/Login.js";

import Dashboard from './components/Pages/manager-pages/dashboard';

import Customer from './components/Pages/manager-pages/customer/Customer';
import CustomerDetail from './components/Pages/manager-pages/customer/CustomerDetail';

import Staff from './components/Pages/manager-pages/staff/Staff';
import StaffDetail from './components/Pages/manager-pages/staff/StaffDetail';

import Order from './components/Pages/manager-pages/order/Order';
import OrderDetail from './components/Pages/manager-pages/order/Order_detail';
import OrderApproved from './components/Pages/manager-pages/order/Order_approved';
import AssignStaff from './components/Pages/manager-pages/order/AssignStaff';


import Service from './components/Pages/admin-pages/services/Services';

import './App.scss'


const App = () => {

  return (
    <>
      <Router>
        <Routes>

          {/* Login */}
          <Route
            index
            element={
              <Login />
            }
          />

          <Route
            path='/'
            element={
              <Layout />
            }
          >

            <Route path='/manager/order' element={<Order />} />
            <Route path='/manager/order-detail/:orderId' element={<OrderDetail />} />
            <Route path='/manager/order-approved/:orderId' element={<OrderApproved />} />
            <Route path='/manager/staff' element={<Staff />} />
            <Route path='/manager/staff-detail/:employeeId' element={<StaffDetail />} />
            <Route path='/manager/customer' element={<Customer />} />
            <Route path='/manager/customer-detail/:customerId' element={<CustomerDetail />} />
            <Route path='/manager/dashboard' element={<Dashboard />} />
            <Route path='//manager/assign-staff/:orderId' element={<AssignStaff />} />

            <Route path='/admin/Service' element={<Service />} />

          </Route>
        </Routes>
      </Router>
    </>
    // {/* <Router>
    //   <Routes>
    //     <Route exact path="/" element={<Login />} />
    //     <Route path="/manager" element={<Manager />} >
    //       <Route path='/manager/order' element={<Order />} />
    //       <Route path='/manager/order-detail' element={<OrderDetail />} />
    //       <Route path='/manager/order-approved' element={<OrderApproved />} />
    //       <Route path='/manager/staff' element={<Staff />} />
    //       <Route path='/manager/staff-detail' element={<StaffDetail />} />
    //       <Route path='/manager/customer' element={<Customer />} />
    //       <Route path='/manager/customer-detail' element={<CustomerDetail />} />
    //       <Route path='/manager/dashboard' element={<Dashboard />} />
    //     </Route>
    //   </Routes>
    // </Router> */}


  );
}

export default App;
