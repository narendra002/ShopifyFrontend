import { useLocation } from 'react-router-dom';

function Customer() {
  const location = useLocation();
  const data = location.state?.myData;

  return (
    <div>
      <p>The data passed from the previous route is: {data}</p>
    </div>
  );
}
export default Customer;