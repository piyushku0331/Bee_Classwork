import React, { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Call backend API to send password reset email/OTP
    setSubmitted(true);
  };

  return (
    <div className="card max-w-md mx-auto mt-24">
      <h1 className="text-2xl font-bold text-genz-accent mb-4">Forgot Password</h1>
      {submitted ? (
        <div className="text-genz-accent">Check your email for password reset instructions.</div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            className="px-4 py-2 rounded bg-genz-bg text-genz-text border border-genz-accent focus:outline-none"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="btn-primary w-full" type="submit">
            Send Reset Link
          </button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
