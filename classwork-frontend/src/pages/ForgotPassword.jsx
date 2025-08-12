import React, { useState } from 'react';
import { sendPasswordResetEmail } from '../api/userApi'; // hypothetical API function

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    try {
      // Call your API - replace with your actual function
      const res = await sendPasswordResetEmail(email);
      if (res.success) {
        setSubmitted(true);
      } else {
        setError(res.message || 'Failed to send reset link.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-root">
      <div className="login-left">
        <div className="login-logo-wrap">
          <div className="login-logo-circle">
            <img src="/images/blog/blogging.png" alt="Logo" className="logo-3d" style={{ height: '3rem', width: '3rem', objectFit: 'contain' }} />
          </div>
        </div>
        <div className="login-illustration">
          <svg width="220" height="160" viewBox="0 0 220 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="110" cy="140" rx="90" ry="18" fill="#2e3a8c" fillOpacity="0.3" />
            <circle cx="60" cy="80" r="32" fill="#7c4dff" />
            <circle cx="160" cy="90" r="28" fill="#536dfe" />
            <rect x="90" y="40" width="40" height="60" rx="20" fill="#fff" fillOpacity="0.2" />
            <rect x="120" y="60" width="30" height="40" rx="15" fill="#fff" fillOpacity="0.15" />
            <rect x="50" y="100" width="60" height="20" rx="10" fill="#fff" fillOpacity="0.1" />
          </svg>
        </div>
        <div className="login-welcome">
          <h2>Forgot Password?</h2>
          <p>Reset your password securely and regain access to your account.</p>
        </div>
      </div>
      <div className="login-right">
        <div className="login-small-illustration">
          <svg width="80" height="60" viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="40" cy="55" rx="30" ry="5" fill="#2e3a8c" />
            <rect x="30" y="20" width="20" height="25" rx="10" fill="#7c4dff" fillOpacity="0.15" />
            <circle cx="50" cy="30" r="8" fill="#536dfe" />
            <rect x="10" y="40" width="30" height="10" rx="5" fill="#7c4dff" fillOpacity="0.08" />
          </svg>
        </div>
        <h1 className="login-title">Reset your password</h1>
        <p className="login-desc">Enter your email to receive a password reset link.</p>
        <div className="login-form-wrap">
          {submitted ? (
            <div className="login-success">Check your email for password reset instructions.</div>
          ) : (
            <form onSubmit={handleSubmit} className="login-form">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {error && <div className="login-error">{error}</div>}
              <button className="btn-primary login-submit-btn" type="submit" disabled={loading}>
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
