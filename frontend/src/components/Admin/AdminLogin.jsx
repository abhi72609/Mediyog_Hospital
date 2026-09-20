import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      const response = await fetch('http://127.0.0.1:8000/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Save session flag so other admin pages know you're logged in
        localStorage.setItem('isAdminAuthenticated', 'true');
        navigate('/admin/dashboard');
      } else {
        setError(data.detail || 'Invalid email or password');
      }
    } catch (err) {
      console.error('Connection error:', err);
      setError('Could not connect to the backend server. Make sure FastAPI is running.');
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
       {/* Direct text inside a paragraph tag     <p><strong>Demo Testing Credentials:</strong></p>
         <p>Email: <code>admin@mediyog.com</code></p>
         <p>Password: <code>admin123</code></p>*/} 
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;