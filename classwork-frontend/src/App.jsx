import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import Footer from './components/Footer';
import Navbar from './components/Navbar';

function App() {
  return (
    <div>
      <ErrorBoundary>
        <UserProvider>
          <BlogProvider>
            <Router>
              <AppNavbarWrapper />
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
                {/* 404 fallback route */}
                <Route path="*" element={<div style={{ padding: "2rem", textAlign: "center" }}>Page not found</div>} />
              </Routes>
              <AppFooterWrapper />
            </Router>
          </BlogProvider>
        </UserProvider>
      </ErrorBoundary>
    </div>
  );
}

function AppNavbarWrapper() {
  const location = useLocation();
  const hideNavbarPaths = [
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
    "/verify-otp",
  ];
  if (hideNavbarPaths.includes(location.pathname)) return null;
  return <Navbar />;
}

function AppFooterWrapper() {
  const location = useLocation();
  const hideFooterPaths = [
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
    "/verify-otp",
  ];
  if (hideFooterPaths.includes(location.pathname)) return null;
  return <Footer />;
}

export default App;
