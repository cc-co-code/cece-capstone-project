import React from "react";
import { useState } from "react";

function BlogPostCard({
  title,
  content,
  city,
  year,
  age,
  postId,
  initialComments = [],
}) {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(initialComments);

  console.log("postId in BlogPostCard:", postId); // Debugging

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/blogposts/${postId}/comments`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment: newComment }),
      });

      if (!response.ok) throw new Error("Failed to add comment");

      const updatedComments = await response.json();
      setComments(updatedComments);
      setNewComment("");
    } catch (error) {
      console.error("Error posting comment:", error);
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

      <div className="comments-section">
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
