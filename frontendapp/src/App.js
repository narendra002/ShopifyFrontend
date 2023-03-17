import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomerList from './Component/CustomerList/CustomerList';
import Topbar from './Component/Topbar/Topbar';
import Sidebar from './Component/Sidebar/Sidebar';
import Customer from './Component/CustomerDetail/Customer';
import CustomerForm from './Component/CustomerEdit/CustomerForm';
import Login from './Component/Login/Login';

function App() {
  return (
    <>
      <Router >
        <Topbar/>

        <div className='container'>
          <Sidebar/>
          <Routes>
            <Route path="/" element={<CustomerList/>} />
            <Route path="/customer_detail" element={<Customer/>} />
            <Route path="/customer_edit" element={<CustomerForm/>} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>

      </Router>
    </>
  );
}


export default App;
