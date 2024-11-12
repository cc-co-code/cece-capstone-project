import React, { useState } from "react";

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

  async function handleDeleteComment(commentId) {
    const response = await fetch(`/api/blogposts/${postId}/comments`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ commentId }), // Übergibt die commentId im Body
    });

    if (response.ok) {
      // Kommentar aus dem State entfernen
      setComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== commentId)
      );
    } else {
      console.error("Error deleting comment");
    }
  }

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
        {comments.map((comment) => (
          <div key={comment._id} className="comment">
            <p>{comment.text}</p>
            <button onClick={() => handleDeleteComment(comment._id)}>
              Delete
            </button>
          </div>
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
