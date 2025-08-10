import { useEffect, useState } from 'react';
import { getAllBlogs } from '../api/blogApi';

const useBlogs = () => {
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

  return { blogs, loading, error };
};

export default useBlogs;
