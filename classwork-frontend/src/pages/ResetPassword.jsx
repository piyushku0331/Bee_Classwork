import React, { useState } from 'react';

const ResetPassword = () => {
  const [form, setForm] = useState({ password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    // TODO: Call backend API to reset password
    setSuccess(true);
  };

  return (
    <div className="card max-w-md mx-auto mt-24">
      <h1 className="text-2xl font-bold text-genz-accent mb-4">Reset Password</h1>
      {success ? (
        <div className="text-genz-accent">Your password has been reset. You can now log in.</div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            className="px-4 py-2 rounded bg-genz-bg text-genz-text border border-genz-accent focus:outline-none"
            type="password"
            name="password"
            placeholder="New Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <input
            className="px-4 py-2 rounded bg-genz-bg text-genz-text border border-genz-accent focus:outline-none"
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button className="btn-primary w-full" type="submit">
            Reset Password
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
