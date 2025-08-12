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
        if (res.data && res.data.length > 0) {
          setBlogs(res.data);
        } else {
          // Add test data if no blogs exist
          setBlogs([
            {
              _id: 'test1',
              title: 'Welcome to Blogify!',
              content: 'This is a sample blog post. Start writing your own blogs now!',
              author: { name: 'Admin' },
              tags: ['welcome', 'sample'],
              created_at: new Date().toISOString(),
              coverImage: '/images/blog/post_cover_1.png',
            },
            {
              _id: 'test2',
              title: 'GenZ UI/UX Tips',
              content: 'Make your blog stand out with modern design and dark mode support.',
              author: { name: 'Jane Doe' },
              tags: ['design', 'genz'],
              created_at: new Date().toISOString(),
              coverImage: '/images/blog/post_cover_2.png',
            },
          ]);
        }
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
