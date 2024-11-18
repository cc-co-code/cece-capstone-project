import { useRouter } from "next/router";
import { useState } from "react";
import React from "react";

import { useSession } from "next-auth/react";

function BlogPostForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [city, setCity] = useState("");
  const [year, setYear] = useState("");
  const [age, setAge] = useState("");
  const [message, setMessage] = useState("");
  const { data: session, status } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();
    router.push("/community-stories");

    const blogPost = { title, content, city, year, age };

    try {
      const response = await fetch("/api/blogposts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ blogPost, session }),
      });

      if (response.ok) {
        setMessage("Post successfully created!");
        setTitle("");
        setContent("");
        setCity("");
        setYear("");
        setAge("");
      } else {
        setMessage("Error creating post.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error creating post.");
    }
  };

  return (
    <div className="create-post-page">
      <section className="info-section">
        <p>
          Welcome to Community Stories! Here, you’re invited to share your own
          experiences if you wish, and read the stories of others. By sharing,
          we can build a supportive network where voices come together in
          understanding and empathy. Participation is entirely voluntary—feel
          free to contribute only what feels comfortable for you.
        </p>
      </section>
      {message && <p>{message}</p>}
      <button
        className="button-uniform"
        onClick={() => router.push("/community-stories")}
      >
        Go back to Community Stories
      </button>
      <form onSubmit={handleSubmit}>
        <label>
          Title (give your post a title):
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <div>
          <label>
            Content (your story goes here):
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </label>
          <label>
            City (where did you get the abortion?):
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </label>
          <label>
            Year (what year did you get the abortion?):
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </label>
          <label>
            Age (how old were you?):
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </label>
          <button type="submit" className="button-uniform">
            Submit Post{" "}
          </button>
        </div>
      </form>
    </div>
  );
}

export default BlogPostForm;
