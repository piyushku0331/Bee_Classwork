import React, { useState } from 'react';
import { createBlog, updateBlog } from '../api/blogApi';

const BlogForm = ({ initialData = {}, onSuccess, token }) => {
  const [form, setForm] = useState({
    title: initialData.title || '',
    content: initialData.content || '',
    tags: initialData.tags ? initialData.tags.join(', ') : '',
  });
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
      const data = {
        ...form,
        tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      };
      let res;
      if (initialData._id) {
        res = await updateBlog(initialData._id, data, token);
      } else {
        res = await createBlog(data, token);
      }
      if (res.success || res.data) {
        if (onSuccess) onSuccess(res.data || res);
      } else {
        setError(res.message || 'Failed to save blog.');
      }
    } catch (err) {
      setError('Failed to save blog.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card flex flex-col gap-4 max-w-2xl mx-auto mt-12">
      <h2 className="text-2xl font-bold text-genz-accent mb-2">{initialData._id ? 'Edit Blog' : 'Create Blog'}</h2>
      <input
        className="px-4 py-2 rounded bg-genz-bg text-genz-text border border-genz-accent focus:outline-none"
        type="text"
        name="title"
        placeholder="Blog Title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <textarea
        className="px-4 py-2 rounded bg-genz-bg text-genz-text border border-genz-accent focus:outline-none min-h-[120px]"
        name="content"
        placeholder="Write your blog content here..."
        value={form.content}
        onChange={handleChange}
        required
      />
      <input
        className="px-4 py-2 rounded bg-genz-bg text-genz-text border border-genz-accent focus:outline-none"
        type="text"
        name="tags"
        placeholder="Tags (comma separated)"
        value={form.tags}
        onChange={handleChange}
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <button className="btn-primary w-full" type="submit" disabled={loading}>
        {loading ? 'Saving...' : initialData._id ? 'Update Blog' : 'Create Blog'}
      </button>
    </form>
  );
};

export default BlogForm;
