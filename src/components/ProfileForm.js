import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function ProfileForm() {
  const { data: session } = useSession();
  const [username, setUsername] = useState(""); // Für das Eingabefeld
  const [savedUsername, setSavedUsername] = useState(""); // Für die Anzeige

  useEffect(() => {
    if (session?.user?.userId) {
      // Abrufen des gespeicherten Benutzernamens
      const fetchUsername = async () => {
        try {
          const response = await fetch(
            `/api/user?userId=${session.user.userId}`
          );
          if (response.ok) {
            const user = await response.json();
            setSavedUsername(user.username || ""); // Gespeicherter Username
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
        setSavedUsername(username); // Willkommensnachricht aktualisieren
        setUsername(""); // Eingabefeld leeren
      } else {
        console.error("Error while saving username");
      }
    } catch (error) {
      console.error("Error while saving username:", error);
    }
  };

  return (
    <div className="profile-container">
      {savedUsername && (
        <h2 className="welcome-text">Welcome, {savedUsername}!</h2>
      )}

      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username} // Nur für die Eingabe verwendet
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </label>
        <button type="submit" className="button-uniform">
          Save
        </button>
      </form>
    </div>
  );
}
