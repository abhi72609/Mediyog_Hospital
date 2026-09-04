import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'admin@mediyog.com' && password === 'admin123') {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid credentials. Try admin@mediyog.com / admin123');
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card">
        <div className="admin-header-icon">🛡️</div>
        <h2>Mediyog Secure Portal</h2>
        <p className="admin-subtitle">Authorized Hospital Personnel Only</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleLogin} className="admin-form">
          <div className="input-group">
            <label>Admin Email</label>
            <input 
              type="email" 
              placeholder="name@mediyog.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="••••••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="admin-submit-btn">Access Dashboard</button>
        </form>

        <div className="admin-help-box">
          <p><strong>Demo Testing Credentials:</strong></p>
          <p>Email: <code>admin@mediyog.com</code></p>
          <p>Password: <code>admin123</code></p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;