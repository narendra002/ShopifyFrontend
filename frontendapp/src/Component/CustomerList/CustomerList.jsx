import { useState, useEffect } from 'react';
import Row from '../CustomerRow/Row';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
function CustomerList() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/customer')
      .then(response => {
        setCustomers(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  function handleRowClick(customer) {
    navigate(`/Customer_Detail`, { state: customer });
  }

  return (
    <div>
      {customers.map(customer => (
    <Row
    key={customer.id}
    name={`${customer.first_name} ${customer.last_name}`} 
    email={customer.email}
    imageUrl={`https://i.pravatar.cc/80?u=${customer.id}`}
    onDetail={() => handleRowClick(customer)}
  />
  
      ))}
    </div>
  );
}
export default CustomerList;