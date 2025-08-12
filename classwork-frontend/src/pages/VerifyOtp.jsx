import React, { useState, useRef, useEffect } from 'react';
import { verifyOtp } from '../api/userApi';
import { useNavigate } from 'react-router-dom';

const OTP_LENGTH = 6; // Number of OTP digits

const VerifyOtp = () => {
  // State to track email input and whether email step is completed
  const [email, setEmail] = useState('');
  const [emailStepCompleted, setEmailStepCompleted] = useState(false);

  // OTP input fields state (array of strings)
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Refs for OTP inputs to handle focus
  const inputsRef = useRef([]);

  // Handle email input change with simple validation (no spaces)
  const handleEmailChange = (e) => {
    const value = e.target.value;
    if (/\s/.test(value)) return; // disallow spaces
    setEmail(value);
  };

  // Validate email format on email step submit
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setEmailStepCompleted(true);
    setError('');
  };

  // Handle OTP input change, accept only digits, auto-focus next
  const handleOtpChange = (index, e) => {
    const value = e.target.value;

    if (!/^\d*$/.test(value)) return; // only digits allowed

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // only last digit (in case of paste)
    setOtp(newOtp);

    if (value && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  // Handle keydown for backspace and arrow navigation in OTP inputs
  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (otp[index]) {
        // Clear current input
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      } else if (index > 0) {
        // Focus previous input if current is empty
        inputsRef.current[index - 1].focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputsRef.current[index - 1].focus();
    } else if (e.key === 'ArrowRight' && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  // Handle paste event to distribute pasted digits over OTP inputs
  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').trim();
    if (!/^\d+$/.test(pasteData)) return; // only digits allowed

    const pasteDigits = pasteData.split('').slice(0, OTP_LENGTH);
    const newOtp = [...otp];

    pasteDigits.forEach((digit, i) => {
      newOtp[i] = digit;
    });
    setOtp(newOtp);

    // Focus last pasted or last input
    const focusIndex = pasteDigits.length >= OTP_LENGTH ? OTP_LENGTH - 1 : pasteDigits.length;
    inputsRef.current[focusIndex]?.focus();
  };

  // Submit OTP verification
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    const otpCode = otp.join('');
    if (otpCode.length !== OTP_LENGTH) {
      setError(`Please enter the ${OTP_LENGTH}-digit OTP.`);
      setLoading(false);
      return;
    }

    try {
      const res = await verifyOtp({ email, otp: otpCode });
      if (res.success) {
        setSuccess(true);
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(res.message || 'OTP verification failed.');
      }
    } catch {
      setError('OTP verification failed.');
    } finally {
      setLoading(false);
    }
  };

  // On email step complete, focus the first OTP input
  useEffect(() => {
    if (emailStepCompleted) {
      inputsRef.current[0]?.focus();
    }
  }, [emailStepCompleted]);

  return (
    <div className="login-root">
      <div className="login-left">
        <div className="login-logo-wrap">
          <div className="login-logo-circle">
            <img src="/images/blog/blogging.png" alt="Logo" className="logo-3d" style={{ height: '3rem', width: '3rem', objectFit: 'contain' }} />
          </div>
        </div>
        <div className="login-illustration">
          {/* Placeholder SVG illustration */}
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
          <h2>{emailStepCompleted ? "Verify OTP" : "Enter Email"}</h2>
          <p>{emailStepCompleted ? "Enter the OTP sent to your email to verify your account." : "Enter your email to receive an OTP."}</p>
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

        {!emailStepCompleted ? (
          <form onSubmit={handleEmailSubmit} className="login-form">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              required
              autoFocus
            />
            {error && <div className="login-error">{error}</div>}
            <button className="btn-primary login-submit-btn" type="submit">
              Send OTP
            </button>
          </form>
        ) : success ? (
          <div className="login-success">OTP verified! Redirecting to login...</div>
        ) : (
          <form onSubmit={handleOtpSubmit} className="login-form" onPaste={handleOtpPaste}>
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  className="otp-input"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  ref={(el) => (inputsRef.current[index] = el)}
                  required
                  autoComplete="off"
                  aria-label={`Digit ${index + 1}`}
                  style={{
                    width: '2.5rem',
                    height: '2.5rem',
                    fontSize: '1.5rem',
                    textAlign: 'center',
                    borderRadius: '0.5rem',
                    border: '1px solid #7c3aed',
                    backgroundColor: 'rgba(36, 37, 46, 0.95)',
                    color: '#f3f4f6',
                  }}
                />
              ))}
            </div>
            {error && <div className="login-error" style={{ marginTop: '1rem' }}>{error}</div>}
            <button className="btn-primary login-submit-btn" type="submit" disabled={loading} style={{ marginTop: '1rem' }}>
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default VerifyOtp;
