import React from 'react';

const BlogCard = ({ blog, onClick }) => {
  return (
    <div
      className="card mb-6 cursor-pointer hover:shadow-2xl transition border border-genz-accent2"
      onClick={onClick}
    >
      <img
        src={blog.coverImage || "/images/blog/post_cover_1.jpg"}
        alt="Blog Cover"
        className="w-full h-48 object-cover rounded-xl mb-3"
      />
      <h2 className="text-2xl font-bold text-genz-accent mb-2">{blog.title}</h2>
      <div className="muted text-xs mb-2">By {blog.author?.name || 'Unknown'} • {new Date(blog.created_at || blog.createdAt).toLocaleDateString()}</div>
      <p className="text-genz-text mb-2 line-clamp-3">{blog.content}</p>
      <div className="flex flex-wrap gap-2 mt-2">
        {blog.tags && blog.tags.map((tag, i) => (
          <span key={i} className="bg-genz-accent2 text-white px-2 py-1 rounded-full text-xs">#{tag}</span>
        ))}
      </div>
    </div>
  );
};

export default BlogCard;
