import React from "react";

const ArticlePreview = ({ title, excerpt, link, anchor }) => {
  const handleClick = () => {
    if (anchor) {
      // Navigiert zu einem Ankerpunkt
      window.location.href = anchor;
    } else if (link) {
      // Öffnet den Link in einem neuen Tab
      window.open(link, "_blank", "noopener noreferrer");
    }
  };
  return (
    <div className="article-preview" onClick={handleClick}>
      <h3 className="article-title">{title}</h3>
      <p className="article-excerpt">{excerpt}</p>
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="article-link"
        >
          Read Full Article
        </a>
      )}
    </div>
  );
};

export default ArticlePreview;
