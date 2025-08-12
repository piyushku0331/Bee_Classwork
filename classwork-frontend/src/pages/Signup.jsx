import React, { useState } from 'react';
import { registerUser } from '../api/userApi';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    date_of_birth: '',
    bio: '',
    profile_image: '',
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Validation function to check each field
  const validate = (fieldValues = form) => {
    let temp = { ...errors };

    if ('name' in fieldValues)
      temp.name = fieldValues.name ? '' : 'Full Name is required.';

    if ('email' in fieldValues) {
      if (!fieldValues.email) temp.email = 'Email is required.';
      else
        temp.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fieldValues.email)
          ? ''
          : 'Email is not valid.';
    }

    if ('password' in fieldValues) {
      if (!fieldValues.password) temp.password = 'Password is required.';
      else if (fieldValues.password.length < 8)
        temp.password = 'Password must be at least 8 characters.';
      else if (!/[A-Z]/.test(fieldValues.password))
        temp.password = 'Password must contain at least one uppercase letter.';
      else if (!/\d/.test(fieldValues.password))
        temp.password = 'Password must contain at least one number.';
      else temp.password = '';
    }

    if ('date_of_birth' in fieldValues)
      temp.date_of_birth = fieldValues.date_of_birth ? '' : 'Date of Birth is required.';

    if ('profile_image' in fieldValues) {
      if (fieldValues.profile_image && fieldValues.profile_image.trim() !== '') {
        temp.profile_image = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/i.test(fieldValues.profile_image)
          ? ''
          : 'Profile Image URL must be a valid image URL.';
      } else {
        temp.profile_image = '';
      }
    }

    setErrors({
      ...temp,
    });

    // Return true if no errors
    return Object.values(temp).every((x) => x === '');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update form state
    setForm({
      ...form,
      [name]: value,
    });
    // Validate on change for user feedback
    validate({ [name]: value });
    // Clear API error on change
    setApiError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      setApiError('');
      setSuccess(false);
      try {
        const res = await registerUser(form);
        if (res.success) {
          setSuccess(true);
        } else {
          setApiError(res.message || 'Signup failed.');
        }
      } catch (err) {
        setApiError('Signup failed. Please try again.');
      } finally {
        setLoading(false);
      }
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
          <svg
            width="220"
            height="160"
            viewBox="0 0 220 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse cx="110" cy="140" rx="90" ry="18" fill="#2e3a8c" fillOpacity="0.3" />
            <circle cx="60" cy="80" r="32" fill="#7c4dff" />
            <circle cx="160" cy="90" r="28" fill="#536dfe" />
            <rect x="90" y="40" width="40" height="60" rx="20" fill="#fff" fillOpacity="0.2" />
            <rect x="120" y="60" width="30" height="40" rx="15" fill="#fff" fillOpacity="0.15" />
            <rect x="50" y="100" width="60" height="20" rx="10" fill="#fff" fillOpacity="0.1" />
          </svg>
        </div>
        <div className="login-welcome">
          <h2>Welcome!</h2>
          <p>Sign up to manage your documents securely and collaborate with your team.</p>
        </div>
      </div>

      <div className="login-right">
        <div className="login-small-illustration">
          <svg
            width="80"
            height="60"
            viewBox="0 0 80 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse cx="40" cy="55" rx="30" ry="5" fill="#2e3a8c" />
            <rect
              x="30"
              y="20"
              width="20"
              height="25"
              rx="10"
              fill="#7c4dff"
              fillOpacity="0.15"
            />
            <circle cx="50" cy="30" r="8" fill="#536dfe" />
            <rect
              x="10"
              y="40"
              width="30"
              height="10"
              rx="5"
              fill="#7c4dff"
              fillOpacity="0.08"
            />
          </svg>
        </div>
        <h1 className="login-title">Create your account</h1>
        <p className="login-desc">
          You can sign in or register from the button below.
        </p>

        {success ? (
          <div className="login-success">
            Registration successful!
            <br />
            Please check your email for the OTP and verify your account.
            <br />
            <Link to="/verify-otp" className="btn-primary login-google-btn" style={{ marginTop: '1rem' }}>
              Go to OTP Verification
            </Link>
          </div>
        ) : (
          <>
            <div className="login-info-boxes">
              <div className="login-info-box">
                <span className="login-info-icon">
                  <svg
                    width="18"
                    height="18"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm6-6V9a6 6 0 1 0-12 0v2a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2Zm-8-2a4 4 0 1 1 8 0v2H8V9Z"
                      fill="#7c4dff"
                    />
                  </svg>
                </span>
                <span>For all users, sign in with your account...</span>
              </div>
              <div className="login-info-box">
                <span className="login-info-icon">
                  <svg
                    width="18"
                    height="18"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm6-6V9a6 6 0 1 0-12 0v2a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2Zm-8-2a4 4 0 1 1 8 0v2H8V9Z"
                      fill="#7c4dff"
                    />
                  </svg>
                </span>
                <span>To add new accounts, please use your Google account.</span>
              </div>
            </div>
            <button className="btn-primary login-google-btn" onClick={() => alert("Google OAuth integration pending")}>
              <svg
                width="22"
                height="22"
                viewBox="0 0 48 48"
                fill="none"
              >
                <g>
                  <path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.7 33.1 29.9 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c2.7 0 5.2.9 7.2 2.4l6.4-6.4C34.5 5.1 29.5 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-8.5 20-21 0-1.3-.1-2.7-.5-4z" />
                  <path fill="#34A853" d="M6.3 14.7l7 5.1C15.5 17.1 19.4 14 24 14c2.7 0 5.2.9 7.2 2.4l6.4-6.4C34.5 5.1 29.5 3 24 3 15.1 3 7.6 8.7 6.3 14.7z" />
                  <path fill="#FBBC05" d="M24 45c5.9 0 10.9-1.9 14.5-5.1l-6.7-5.5c-2 1.4-4.5 2.2-7.8 2.2-5.9 0-10.9-3.8-12.7-9.1l-7 5.4C7.6 39.3 15.1 45 24 45z" />
                  <path fill="#EA4335" d="M44.5 20H24v8.5h11.7c-1.1 3.1-4.2 5.5-7.7 5.5-2.2 0-4.2-.7-5.7-2.1l-7 5.4C15.1 44.3 19.3 45 24 45c10.5 0 20-8.5 20-21 0-1.3-.1-2.7-.5-4z" />
                </g>
              </svg>
              Sign up with Google
            </button>
            <div className="login-privacy-note">
              By clicking Continue with Google you agree with{' '}
              <span className="underline cursor-pointer">Terms and conditions</span> and{' '}
              <span className="underline cursor-pointer">Privacy Policy</span>.
            </div>
            <div className="login-divider">
              <div className="login-divider-line" />
              <span>or</span>
              <div className="login-divider-line" />
            </div>

            <form onSubmit={handleSubmit} className="login-form" noValidate>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
              />
              {errors.name && <div className="login-error">{errors.name}</div>}

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />
              {errors.email && <div className="login-error">{errors.email}</div>}

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
              />
              {errors.password && <div className="login-error">{errors.password}</div>}

              <input
                type="date"
                name="date_of_birth"
                placeholder="Date of Birth"
                value={form.date_of_birth}
                onChange={handleChange}
                required
              />
              {errors.date_of_birth && <div className="login-error">{errors.date_of_birth}</div>}

              <textarea
                name="bio"
                placeholder="Short Bio (optional)"
                value={form.bio}
                onChange={handleChange}
              />

              <input
                type="url"
                name="profile_image"
                placeholder="Profile Image URL (optional)"
                value={form.profile_image}
                onChange={handleChange}
              />
              {errors.profile_image && <div className="login-error">{errors.profile_image}</div>}

              {apiError && <div className="login-error">{apiError}</div>}

              {(() => {
                // Only check for errors and required fields, do not call validate() here
                const requiredFields = ['name', 'email', 'password', 'date_of_birth'];
                const hasErrors = Object.values(errors).some((x) => x !== '');
                const hasEmptyRequired = requiredFields.some((field) => !form[field]);
                const isFormValid = !hasErrors && !hasEmptyRequired;
                return (
                  <button
                    className="btn-primary login-submit-btn"
                    type="submit"
                    disabled={loading || !isFormValid}
                  >
                    {loading ? 'Signing up...' : 'Sign Up'}
                  </button>
                );
              })()}
            </form>
            <Link to="/forgot-password" className="login-link">
              Forgot password?
            </Link>
            <div className="login-link-alt">
              Already have an account? <Link to="/login">Login</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Signup;
