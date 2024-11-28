import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login attempted:', { loginEmail, loginPassword });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log('Registration attempted:', { registerName, registerEmail, registerPassword });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Authentication</h2>
        <div className="tabs">
          <div className="tab-buttons">
            <button>Login</button>
            <button>Register</button>
          </div>
          <div className="tab-content">
            <form onSubmit={handleLogin}>
              <input 
                type="email" 
                placeholder="Email" 
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
              <input 
                type="password" 
                placeholder="Password" 
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
              <button type="submit">Login</button>
            </form>
            <form onSubmit={handleRegister} style={{display: 'none'}}>
              <input 
                type="text" 
                placeholder="Full Name" 
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
                required
              />
              <input 
                type="email" 
                placeholder="Email" 
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                required
              />
              <input 
                type="password" 
                placeholder="Password" 
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                required
              />
              <button type="submit">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;