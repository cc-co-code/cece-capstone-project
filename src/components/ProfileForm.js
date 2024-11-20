import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [username, setUsername] = useState("");
  const [savedUsername, setSavedUsername] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (session?.user?.userId) {
      const fetchUsername = async () => {
        try {
          const response = await fetch(
            `/api/user?userId=${session.user.userId}`
          );
          if (response.ok) {
            const user = await response.json();
            setSavedUsername(user.username || "");
          }
        } catch (error) {
          console.error("Error fetching username:", error);
        }
      };
      fetchUsername();
    }
  }, [session]);

  useEffect(() => {
    if (session?.user?.userId) {
      const fetchPosts = async () => {
        try {
          const response = await fetch(
            `/api/user/posts?userId=${session.user.userId}`
          );
          if (response.ok) {
            const data = await response.json();
            setPosts(data);
          }
        } catch (error) {
          console.error("Error fetching user posts:", error);
        }
      };

      const fetchComments = async () => {
        try {
          const response = await fetch(
            `/api/user/comments?userId=${session.user.userId}`
          );
          if (response.ok) {
            const data = await response.json();
            setComments(data);
          }
        } catch (error) {
          console.error("Error fetching user comments:", error);
        }
      };

      fetchPosts();
      fetchComments();
    }
  }, [session]);

  const handleSaveUsername = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, userId: session.user.userId }),
      });

      if (response.ok) {
        setSavedUsername(username);
        setUsername("");
        setIsEditing(false);
      } else {
        console.error("Error while saving username");
      }
    } catch (error) {
      console.error("Error while saving username:", error);
    }
  };

  if (!session) {
    return (
      <div className="profile-container">
        <div className="profile-empty-state">
          Please sign in to view your profile.
        </div>
      </div>
    );
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="profile-container">
      <section className="profile-section">
        <div className="profile-header">
          {savedUsername && !isEditing ? (
            <div className="profile-username">
              <h2>Welcome, {savedUsername}!</h2>
              <button
                className="button-uniform"
                onClick={() => setIsEditing(true)}
              >
                Edit Username
              </button>
            </div>
          ) : (
            <form onSubmit={handleSaveUsername} className="profile-form">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
              />
              <button type="submit" className="button-uniform">
                Save Username
              </button>
            </form>
          )}
        </div>
      </section>

      <section className="profile-section">
        <h2>Your Blogposts</h2>
        {posts.length > 0 ? (
          <div className="profile-list">
            {posts.map((post) => (
              <div key={post._id} className="profile-list-item">
                <a href={`/community-stories?postId=${post._id}`}>
                  {post.title}
                </a>
                <div className="profile-list-meta">
                  <span>{formatDate(post.createdAt)}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="profile-empty-state">
            You haven't written any blogposts yet.
          </div>
        )}
      </section>

      <section className="profile-section">
        <h2>Your Comments</h2>
        {comments.length > 0 ? (
          <div className="profile-list">
            {comments.map((comment) => (
              <div key={comment._id} className="profile-list-item">
                <p className="comment-text">{comment.text}</p>
                <div className="profile-list-meta">
                  <a href={`/community-stories?postId=${comment.postId}`}>
                    View Post
                  </a>
                  <span>{formatDate(comment.createdAt)}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="profile-empty-state">
            You haven't commented on any posts yet.
          </div>
        )}
      </section>
    </div>
  );
}
