import React, { useEffect, useState } from 'react';
import { getAllBlogs } from '../api/blogApi';
import BlogCard from './BlogCard';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await getAllBlogs();
        setBlogs(res.data || []);
      } catch (err) {
        setError('Failed to load blogs.');
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) return <div className="muted text-center">Loading blogs...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!blogs.length) return <div className="muted text-center">No blogs found.</div>;

  return (
    <div className="flex flex-col gap-6">
      {blogs.map((blog) => (
        <BlogCard key={blog._id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
