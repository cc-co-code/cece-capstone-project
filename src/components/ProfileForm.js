import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session } = useSession();

  // States
  const [username, setUsername] = useState("");
  const [savedUsername, setSavedUsername] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  // Fetch Username
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

  // Fetch Blogposts and Comments
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

  return (
    <div className="profile-container">
      {/* Welcome Section */}
      {savedUsername && !isEditing ? (
        <div>
          <h2 className="welcome-text">Welcome, {savedUsername}!</h2>
          <button className="button-uniform" onClick={() => setIsEditing(true)}>
            Edit Username
          </button>
        </div>
      ) : (
        <form onSubmit={handleSaveUsername}>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </label>
          <button type="submit" className="button-uniform">
            Save
          </button>
        </form>
      )}

      {/* Blogposts Section */}
      <section>
        <h2>Your Blogposts</h2>
        {posts.length > 0 ? (
          <ul>
            {posts.map((post) => (
              <li key={post._id}>
                <a href={`/community-stories?postId=${post._id}`}>
                  {post.title}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>You haven't written any blogposts yet.</p>
        )}
      </section>

      {/* Comments Section */}
      <section>
        <h2>Your Comments</h2>
        {comments.length > 0 ? (
          <ul>
            {comments.map((comment) => (
              <li key={comment._id}>
                <p>{comment.text}</p>
                <small>
                  <a href={`/community-stories?postId=${comment.postId}`}>
                    View Comment
                  </a>
                </small>
              </li>
            ))}
          </ul>
        ) : (
          <p>You haven't commented on any posts yet.</p>
        )}
      </section>
    </div>
  );
}
