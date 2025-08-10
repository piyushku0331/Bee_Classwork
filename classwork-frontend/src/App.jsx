import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import About from './pages/About';
import Contact from './pages/Contact';
import Trash from './pages/Trash';
import VerifyOtp from './pages/VerifyOtp';
import { UserProvider } from './contexts/UserContext';
import { BlogProvider } from './contexts/BlogContext';
import ErrorBoundary from './components/ErrorBoundary';

const App = () => (
  <ErrorBoundary>
    <UserProvider>
      <BlogProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/trash" element={<Trash />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />
          </Routes>
        </Router>
      </BlogProvider>
    </UserProvider>
  </ErrorBoundary>
);

export default App;
