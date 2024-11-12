import React from "react";

function BlogPostCard({ title, content, city, year, age }) {
  return (
    <div className="blog-post-card">
      <h2>{title}</h2>
      <p>{content}</p>
      {city && (
        <p>
          <strong>City:</strong> {city}
        </p>
      )}
      {year && (
        <p>
          <strong>Year:</strong> {year}
        </p>
      )}
      {age && (
        <p>
          <strong>Age:</strong> {age}
        </p>
      )}
    </div>
  );
}

export default BlogPostCard;
