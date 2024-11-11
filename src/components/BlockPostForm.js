import { useState } from "react";
import React from "react";

function BlogPostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [city, setCity] = useState("");
  const [year, setYear] = useState("");
  const [age, setAge] = useState("");
  const [message, setMessage] = useState(""); // For displaying success or error messages

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Package form data into an object
    const blogPost = { title, content, city, year, age };

    try {
      // Send request to your API to save the blog post
      const response = await fetch("/api/blogposts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogPost),
      });

      if (response.ok) {
        setMessage("Post successfully created!");
        // Reset form
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
    <div>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Content:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </label>
        <label>
          City:
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>
        <label>
          Year:
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </label>
        <label>
          Age:
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </label>
        <button type="submit">Submit Post</button>
      </form>
    </div>
  );
}

export default BlogPostForm;