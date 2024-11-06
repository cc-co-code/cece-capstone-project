import { FaceFrownIcon } from "@heroicons/react/24/outline";
import React from "react";

const ArticlePreview = ({ title, excerpt, link }) => {
  return (
    <div className="article-preview">
      <h3 className="article-title">{title}</h3>
      <p className="article-excerpt">{excerpt}</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="article-link"
      >
        Read Full Article
      </a>
    </div>
  );
};

export default ArticlePreview;
