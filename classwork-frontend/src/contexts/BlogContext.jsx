import React, { createContext, useContext, useState } from 'react';

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);

  return (
    <BlogContext.Provider value={{ blogs, setBlogs, selectedBlog, setSelectedBlog }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => useContext(BlogContext);
