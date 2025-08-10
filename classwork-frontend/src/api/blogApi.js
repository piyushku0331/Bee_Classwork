// Utility to upload an image file to /uploads
export async function uploadImage(file) {
  const formData = new FormData();
  formData.append('file', file);
  const token = localStorage.getItem('token');
  const res = await fetch('/uploads', {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });
  return res.json();
}
// Blog API utility for CRUD operations
const API_BASE = '/api/blogs';

export async function getAllBlogs() {
  const res = await fetch(API_BASE);
  return res.json();
}

export async function getBlogById(id) {
  const res = await fetch(`${API_BASE}/${id}`);
  return res.json();
}

export async function createBlog(data, token) {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateBlog(id, data, token) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteBlog(id, token) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  return res.json();
}
