import { useLocation, useNavigate } from "react-router-dom";
import "./Customer.css"
function Customer() {
  const location = useLocation();
  const navigate=useNavigate();
  const customer = location.state;
  console.log(customer);
  const handleEdit = () => {
    // Code to handle the edit action goes here
    navigate(`/Customer_Edit`, { state: customer });

  }
  return (
    <div className='customer-container'>
      <h1 className='customer-heading'>{`${customer.first_name} ${customer.last_name}`}</h1>
      <div className='customer-details'>
        {/* <p>Address:</p>
        <p>{customer.default_address.address1}, {customer.default_address.city}, {customer.default_address.province} {customer.default_address.zip}</p> */}
        <p>Phone:</p>
        <p>{customer.phone}</p>
        <p>Email:</p>
        <p>{customer.email}</p>
        <p>Total Orders:</p>
        <p>{customer.orders_count}</p>
        <p>Total Spent:</p>
        <p>{customer.total_spent}</p>
        
      </div>
      <button onClick={handleEdit}>Edit</button>
    </div>
  );
}
export default Customer;