import { useState } from 'react';
import './Login.css'
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
        // setIsLoggedIn(true);
    window.location.href=`http://localhost:4000/customer/auth/shopify?shop=${username}`;

  }

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <div>
          <label>Shop Name Url : </label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
       
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
