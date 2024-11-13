import React, { useState } from "react";
import Router from "next/router";

function BlogPostCard({
  title,
  content,
  city,
  year,
  age,
  postId,
  authorId, // ID des Verfassers des Posts
  currentUserId, // ID des aktuellen Benutzers
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
        body: JSON.stringify({ comment: newComment, authorId: currentUserId }), // Übergebe die authorId des Kommentars
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
      setComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== commentId)
      );
    } else {
      console.error("Error deleting comment");
    }
  }

  async function handleDeletePost() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmed) return;

    try {
      // Prüfe, ob postId definiert ist
      if (!postId) {
        console.error("postId is undefined");
        return;
      }

      const response = await fetch(`/api/blogposts/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Post deleted successfully");
        Router.push("/community-stories");
      } else {
        console.error("Error deleting post:", await response.json());
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  }

  return (
    <div className="blog-post-card">
      <h2>{title}</h2>
      <section>{content}</section>
      <div>
        {city && (
          <p>
            <strong>City of Abortion:</strong> {city}
          </p>
        )}
        {year && (
          <p>
            <strong>Year of Abortion:</strong> {year}
          </p>
        )}
        {age && (
          <p>
            <strong>Age at the time of Abortion:</strong> {age}
          </p>
        )}
      </div>

      {/* Nur für den Verfasser des Blogposts: Delete-Button anzeigen */}
      {currentUserId === authorId && (
        <button onClick={handleDeletePost}>Delete Post</button>
      )}

      <div className="comments-section">
        <h3>Comments</h3>
        {comments.map((comment) => (
          <div key={comment._id} className="comment">
            <p>{comment.text}</p>
            {/* Nur für den Verfasser des Kommentars: Delete-Button anzeigen */}
            {currentUserId === comment.authorId && (
              <button onClick={() => handleDeleteComment(comment._id)}>
                Delete
              </button>
            )}
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
