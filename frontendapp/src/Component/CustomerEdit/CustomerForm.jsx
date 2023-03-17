import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./CustomerForm.css";
import axios from 'axios'
function CustomerForm( ) {
  const navigate = useNavigate();
  function onSubmit(updatedCustomer) {
    // Update the state with the updated customer data
    navigate(`/`);
  }
  
  const location = useLocation();
  
  const customer = location.state;
  const [firstName, setFirstName] = useState(customer.first_name);
  const [lastName, setLastName] = useState(customer.last_name);
  // const [address1, setAddress1] = useState(customer.default_address.address1);
  // const [city, setCity] = useState(customer.default_address.city);
 
  // const [zip, setZip] = useState(customer.default_address.zip);
  const [phone, setPhone] = useState(customer.phone);
  const [email, setEmail] = useState(customer.email);
 const[totalspent,settotalspent]=useState(customer.total_spent);
 const[orderscount,setorderscount]=useState(customer.orders_count);
  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedCustomer = {
      id: customer.id,
      first_name: firstName,
      last_name: lastName,
      // default_address: {
      //   address1: address1,
      //   city: city,
        
      //   zip: zip,
      // },
      phone: phone,
      email: email,
      orders_count: orderscount,
      total_spent: totalspent
    };

    axios.put(`http://localhost:4000/customer/${customer.id}`, updatedCustomer)
  .then(response => {
    console.log(response.data);
    
    console.log('Customer updated successfully!');
     onSubmit(updatedCustomer);
  })
  .catch(error => {
    console.log(error);
  });

  
  };

  return (
    <form className="customer-form" onSubmit={handleSubmit}>
      <label>
        First Name:
        <input type="text" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
      </label>
      <label>
        Last Name:
        <input type="text" value={lastName} onChange={(event) => setLastName(event.target.value)} />
      </label>
      
      <label>
        Phone:
        <input type="text" value={phone} onChange={(event) => setPhone(event.target.value)} />
      </label>
    
      <label>
        Order:
        <input type="text" value={orderscount} onChange={(event) => setorderscount(event.target.value)} />
      </label>
      <label>
        Total Spent:
        <input type="text" value={totalspent} onChange={(event) => settotalspent(event.target.value)} />
      </label>
      <button type="submit">Save</button>
    </form>
  );
  }
  export default CustomerForm;