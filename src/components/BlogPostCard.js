import React from "react";
import { useState } from "react";

function BlogPostCard({
  title,
  content,
  city,
  year,
  age,
  postID,
  initialComments = [],
}) {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(initialComments);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`/api/blogposts/${postID}/comments`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment: newComment }),
    });

    if (response.ok) {
      const updatedComments = await response.json();
      setComments(updatedComments);
      setNewComment("");
    }
  };

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

      <div className="comment-section">
        <h3>Comments</h3>
        {comments.map((comment, index) => (
          <p key={index}>{comment.text}</p>
        ))}

        <form onSubmit={handleCommentSubmit}>
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment"
            required
          />
          <button type="submit">Comment</button>
        </form>
      </div>
    </div>
  );
}

export default BlogPostCard;
