import React, { useState } from 'react';
import { loginUser } from '../api/userApi';
import { Link } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await loginUser(form);
      if (!res.success && res.message) setError(res.message);
      // Handle login success (store token, redirect, etc.)
    } catch (err) {
      setError('Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card max-w-md mx-auto mt-24">
      <h1 className="text-2xl font-bold text-genz-accent mb-4">Login</h1>
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
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button className="btn-primary w-full" type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <Link to="/forgot-password" className="muted hover:text-genz-accent2 text-sm text-right">Forgot password?</Link>
        <div className="muted text-sm text-center">
          Don't have an account? <Link to="/signup" className="text-genz-accent underline">Sign up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
