// User API utility for registration, login, profile, and OTP
const API_BASE = '/api/users';
const OTP_API = '/api/verify-otp';

export async function registerUser(data) {
  const res = await fetch(`${API_BASE}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function loginUser(data) {
  const res = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function getProfile(token) {
  const res = await fetch(`${API_BASE}/profile`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return res.json();
}

export async function updateProfile(data, token) {
  const res = await fetch(`${API_BASE}/profile`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function verifyOtp(data) {
  const res = await fetch(OTP_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}
 
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};
 
export async function getUserProfile() {
  const res = await fetch(`${API_BASE}/profile`, {
    headers: { ...getAuthHeaders() },
  });
  return res.json();
}
 
export async function updateUserProfile(data) {
  const res = await fetch(`${API_BASE}/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });
  return res.json();
}
