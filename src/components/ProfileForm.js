import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function ProfileForm() {
  const { data: session } = useSession();
  const [username, setUsername] = useState("");
  const [savedUsername, setSavedUsername] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Fetch the saved username on mount
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

  const handleSubmit = async (e) => {
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
        setIsEditing(false); // Exit editing mode after saving
      } else {
        console.error("Error while saving username");
      }
    } catch (error) {
      console.error("Error while saving username:", error);
    }
  };

  return (
    <div className="profile-container">
      {savedUsername && !isEditing ? (
        <div>
          <h2 className="welcome-text">Welcome, {savedUsername}!</h2>
          <button className="button-uniform" onClick={() => setIsEditing(true)}>
            Edit Username
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
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
    </div>
  );
}
