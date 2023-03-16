import './App.css';
import CustomerList from './Component/CustomerList/CustomerList';
import Topbar from "./Component/Topbar/Topbar"
import Sidebar from "./Component/Sidebar/Sidebar"
import Customer from './Component/CustomerDetail/Customer'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  return (<>
    <Router>
      <Topbar/>
 
<div className='container'>
  <Sidebar/>
    <CustomerList/>
   </div>

      <Routes>
        <Route  path="/Customer_Detail" element={<Customer/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
