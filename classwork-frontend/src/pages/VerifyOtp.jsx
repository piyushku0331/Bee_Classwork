import React, { useState } from 'react';
import { verifyOtp } from '../api/userApi';
import { useNavigate } from 'react-router-dom';

const VerifyOtp = () => {
  const [form, setForm] = useState({ email: '', otp: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      const res = await verifyOtp(form);
      if (res.success) {
        setSuccess(true);
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(res.message || 'OTP verification failed.');
      }
    } catch (err) {
      setError('OTP verification failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card max-w-md mx-auto mt-24">
      <h1 className="text-2xl font-bold text-genz-accent mb-4">Verify OTP</h1>
      {success ? (
        <div className="text-genz-accent">OTP verified! Redirecting to login...</div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            className="px-4 py-2 rounded bg-genz-bg text-genz-text border border-genz-accent focus:outline-none"
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            className="px-4 py-2 rounded bg-genz-bg text-genz-text border border-genz-accent focus:outline-none"
            type="text"
            name="otp"
            placeholder="Enter OTP"
            value={form.otp}
            onChange={handleChange}
            required
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button className="btn-primary w-full" type="submit" disabled={loading}>
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>
      )}
    </div>
  );
};

export default VerifyOtp;