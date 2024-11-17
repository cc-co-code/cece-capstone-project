import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function ProfileForm() {
  const { data: session } = useSession();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, userId: session.user.userId }),
    });

    if (response.ok) {
      setWelcomeMessage(`Welcome, ${username}!`);
      setUsername(""); // optional, um das Eingabefeld nach dem Speichern zu leeren
    } else {
      console.error("Error while saving");
    }
  };

  return (
    <div className="profile-container">
      {welcomeMessage && <h2 className="welcome-text">{welcomeMessage}</h2>}

      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
