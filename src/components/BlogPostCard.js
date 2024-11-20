import React, { useState, useCallback, memo } from "react";
import { useSession } from "next-auth/react";

const BlogPostCard = memo(
  ({
    title,
    content,
    city,
    year,
    age,
    postId,
    authorId,
    authorUsername,
    createdAt,
    initialComments = [],
  }) => {
    const [newComment, setNewComment] = useState("");
    const [comments, setComments] = useState(initialComments);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const { data: session } = useSession();

    const handleCommentSubmit = useCallback(
      async (e) => {
        e.preventDefault();
        if (!session?.user) {
          setError("Please sign in to comment");
          return;
        }

        setIsSubmitting(true);
        setError("");

        try {
          const response = await fetch(`/api/blogposts/${postId}/comments`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              comment: newComment,
              authorId: session.user.userId,
              authorUsername: session.user.username,
            }),
          });

          if (!response.ok) throw new Error("Failed to add comment");

          const updatedComments = await response.json();
          setComments(updatedComments);
          setNewComment("");
        } catch (error) {
          setError("Error posting comment. Please try again.");
          console.error("Error posting comment:", error);
        } finally {
          setIsSubmitting(false);
        }
      },
      [newComment, postId, session]
    );

    const handleDeleteComment = useCallback(
      async (commentId) => {
        if (!window.confirm("Are you sure you want to delete this comment?")) {
          return;
        }

        try {
          const response = await fetch(`/api/blogposts/${postId}/comments`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              commentId,
              userId: session?.user?.userId,
            }),
          });

          if (!response.ok) throw new Error("Failed to delete comment");

          setComments((prevComments) =>
            prevComments.filter((comment) => comment._id !== commentId)
          );
        } catch (error) {
          setError("Error deleting comment");
          console.error("Error deleting comment:", error);
        }
      },
      [postId, session?.user?.userId]
    );

    const handleDeletePost = useCallback(async () => {
      if (!window.confirm("Are you sure you want to delete this post?")) {
        return;
      }

      try {
        const response = await fetch(`/api/blogposts/${postId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Failed to delete post");

        window.location.href = "/community-stories";
      } catch (error) {
        setError("Error deleting post");
        console.error("Error deleting post:", error);
      }
    }, [postId]);

    const formatDate = (date) => {
      return new Date(date).toLocaleString();
    };

    return (
      <div className="blog-post-card">
        <h2>{title}</h2>
        <div className="post-meta">
          <span>By {authorUsername || "Anonymous"}</span>
          <span className="post-date">{formatDate(createdAt)}</span>
        </div>

        <div className="post-content">{content}</div>

        {(city || year || age) && (
          <div className="post-details">
            {city && (
              <div className="detail-item">
                <strong>City of Abortion:</strong> {city}
              </div>
            )}
            {year && (
              <div className="detail-item">
                <strong>Year of Abortion:</strong> {year}
              </div>
            )}
            {age && (
              <div className="detail-item">
                <strong>Age at time of Abortion:</strong> {age}
              </div>
            )}
          </div>
        )}

        {session?.user?.userId === authorId && (
          <button onClick={handleDeletePost} className="button-uniform">
            Delete Post
          </button>
        )}

        <div className="comments-section">
          <h3>Comments ({comments.length})</h3>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleCommentSubmit} className="comment-form">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              disabled={isSubmitting}
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="button-uniform"
            >
              {isSubmitting ? "Posting..." : "Comment"}
            </button>
          </form>

          <div className="comments-list">
            {comments.map((comment) => (
              <div key={comment._id} className="comment">
                <p className="comment-text">{comment.text}</p>
                <div className="comment-meta">
                  <span>{comment.authorUsername || "Anonymous"}</span>
                  <span className="comment-date">
                    {formatDate(comment.createdAt)}
                  </span>
                  {session?.user?.userId === comment.authorId && (
                    <button
                      onClick={() => handleDeleteComment(comment._id)}
                      className="button-uniform"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

BlogPostCard.displayName = "BlogPostCard";

export default BlogPostCard;
