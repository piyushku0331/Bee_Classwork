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
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      const res = await registerUser(form);
      if (res.success) setSuccess(true);
      else setError(res.message || 'Signup failed.');
    } catch (err) {
      setError('Signup failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card max-w-md mx-auto mt-24">
      <h1 className="text-2xl font-bold text-genz-accent mb-4">Sign Up</h1>
      {success ? (
        <div className="text-genz-accent">Registration successful! Please check your email for verification.</div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            className="px-4 py-2 rounded bg-genz-bg text-genz-text border border-genz-accent focus:outline-none"
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />
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
          <input
            className="px-4 py-2 rounded bg-genz-bg text-genz-text border border-genz-accent focus:outline-none"
            type="date"
            name="date_of_birth"
            placeholder="Date of Birth"
            value={form.date_of_birth}
            onChange={handleChange}
            required
          />
          <textarea
            className="px-4 py-2 rounded bg-genz-bg text-genz-text border border-genz-accent focus:outline-none"
            name="bio"
            placeholder="Short Bio (optional)"
            value={form.bio}
            onChange={handleChange}
          />
          <input
            className="px-4 py-2 rounded bg-genz-bg text-genz-text border border-genz-accent focus:outline-none"
            type="url"
            name="profile_image"
            placeholder="Profile Image URL (optional)"
            value={form.profile_image}
            onChange={handleChange}
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button className="btn-primary w-full" type="submit" disabled={loading}>
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
          <Link to="/forgot-password" className="muted hover:text-genz-accent2 text-sm text-right">Forgot password?</Link>
          <div className="muted text-sm text-center">
            Already have an account? <Link to="/login" className="text-genz-accent underline">Login</Link>
          </div>
        </form>
      )}
    </div>
  );
};

export default Signup;
