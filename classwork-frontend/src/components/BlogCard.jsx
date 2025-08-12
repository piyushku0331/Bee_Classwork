import React from 'react';

const BlogCard = ({ blog, onClick }) => {
  const date = blog.created_at || blog.createdAt;

  return (
    <div
      className="card blog-card"
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <img
        src={blog.coverImage || "/images/blog/post_cover_1.png"}
        alt="Blog Cover"
        className="blog-card-img"
        onError={e => { e.target.onerror = null; e.target.src = "/images/blog/background.png"; }}
      />

      <h2 className="blog-card-title">{blog.title}</h2>

      <div className="muted blog-card-meta">
        By {blog.author?.name || 'Unknown'} • {date ? new Date(date).toLocaleDateString() : 'No date'}
      </div>

      <p className="blog-card-content">
        {blog.content}
      </p>

      <div className="blog-card-tags">
        {blog.tags && blog.tags.map((tag, i) => (
          <span key={i} className="blog-card-tag">#{tag}</span>
        ))}
      </div>
    </div>
  );
};

export default BlogCard;
