import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import './Admin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Reset Flow States
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [step, setStep] = useState(1); // Step 1: Enter Email, Step 2: Enter OTP, Step 3: New Password
  const [inputOtp, setInputOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

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

  // Step 1: Send OTP via EmailJS using template_qe9pqmq
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);

    try {
      await emailjs.send(
        'service_wsb5wzm', // Your EmailJS Service ID
        'template_qe9pqmq', // Your custom Reset Password Template ID
        {
          to_email: email,
          otp_code: otp,
        },
        'MI042Pr1CBZZqEM8o' // Your EmailJS Public Key
      );

      setSuccessMsg('OTP sent successfully to your email!');
      setLoading(false);
      setStep(2);
    } catch (err) {
      console.error('EmailJS error:', err);
      setError('Failed to send email. Check EmailJS template configuration.');
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setError('');

    if (inputOtp.trim() === generatedOtp.trim()) {
      setSuccessMsg('OTP verified successfully! Please enter your new password.');
      setStep(3);
    } else {
      setError('Invalid OTP code. Please check your email and try again.');
    }
  };

  // Step 3: Update Password in Backend Database
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    try {
      const response = await fetch('http://127.0.0.1:8000/api/admin/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, new_password: newPassword }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccessMsg('Password updated successfully! Redirecting to login...');
        setTimeout(() => {
          setIsForgotPassword(false);
          setStep(1);
          setEmail('');
          setPassword('');
          setNewPassword('');
          setInputOtp('');
          setSuccessMsg('');
        }, 2500);
      } else {
        setError(data.detail || 'Failed to update password in database.');
      }
    } catch (err) {
      console.error('Database connection error:', err);
      setError('Could not connect to the backend server.');
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card">
        <div className="admin-header-icon">🛡️</div>
        <h2>Mediyog Secure Portal</h2>
        <p className="admin-subtitle">
          {!isForgotPassword
            ? 'Authorized Hospital Personnel Only'
            : step === 1 ? 'Step 1: Enter Email for OTP' : step === 2 ? 'Step 2: Enter 6-Digit OTP' : 'Step 3: Set New Password'}
        </p>

        {error && <div className="error-message">{error}</div>}
        {successMsg && <div className="success-message" style={{ color: '#15803d', background: '#dcfce7', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px', border: '1px solid #bbf7d0', textAlign: 'center' }}>{successMsg}</div>}

        {!isForgotPassword ? (
          /* --- LOGIN FORM --- */
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

            <div style={{ textAlign: 'right', marginTop: '-10px' }}>
              <span
                onClick={() => { setIsForgotPassword(true); setStep(1); setError(''); setSuccessMsg(''); }}
                style={{ color: '#3b82f6', fontSize: '13px', cursor: 'pointer', textDecoration: 'underline', fontWeight: '500' }}
              >
                Forgot Password?
              </span>
            </div>

            <button type="submit" className="admin-submit-btn">Access Dashboard</button>
          </form>
        ) : (
          /* --- FORGOT PASSWORD FLOW --- */
          <div>
            {step === 1 && (
              <form onSubmit={handleSendOtp} className="admin-form">
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
                <button type="submit" className="admin-submit-btn" disabled={loading}>
                  {loading ? 'Sending OTP...' : 'Send Verification OTP'}
                </button>
                <div style={{ textAlign: 'center', marginTop: '10px' }}>
                  <span
                    onClick={() => { setIsForgotPassword(false); setStep(1); setError(''); setSuccessMsg(''); }}
                    style={{ color: '#3b82f6', fontSize: '13px', cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    Back to Login
                  </span>
                </div>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleVerifyOtp} className="admin-form">
                <div className="input-group">
                  <label>Enter 6-Digit OTP Code</label>
                  <input
                    type="text"
                    placeholder="123456"
                    maxLength="6"
                    value={inputOtp}
                    onChange={(e) => setInputOtp(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="admin-submit-btn">Verify OTP</button>
                <div style={{ textAlign: 'center', marginTop: '10px' }}>
                  <span
                    onClick={() => setStep(1)}
                    style={{ color: '#3b82f6', fontSize: '13px', cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    Resend Email / Change Email
                  </span>
                </div>
              </form>
            )}

            {step === 3 && (
              <form onSubmit={handleUpdatePassword} className="admin-form">
                <div className="input-group">
                  <label>New Password</label>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="admin-submit-btn">Update Password</button>
              </form>
            )}
          </div>
        )}

        <div className="admin-help-box"></div>
      </div>
    </div>
  );
};

export default AdminLogin;