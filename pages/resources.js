import React, { useEffect, useState } from "react";
import ArticlePreview from "@/src/components/ArticlePreview";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";

const ResourcesPage = () => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    fetch("/api/resources")
      .then((response) => response.json())
      .then((data) => setResources(data))
      .catch((error) =>
        console.error("Fehler beim Laden der Ressourcen:", error)
      );
  }, []);

  // Ressourcen nach Kategorien gruppieren
  const groupedResources = resources.reduce((acc, resource) => {
    const { category } = resource;
    if (!acc[category]) acc[category] = [];
    acc[category].push(resource);
    return acc;
  }, {});

  return (
    <div className="page-container">
      <Header />
      <h1>Resources & Articles</h1>
      <p className="welcome-text">
        Welcome to the Resources Section. Here you can browse through curated
        links and external websites to find reliable information, support
        services, and helpful tools related to abortion. Explore the categories
        below to discover resources tailored to your needs.
      </p>

      {/* Dynamisch generierte Kategorien */}
      {Object.entries(groupedResources).map(([category, resources]) => (
        <section
          key={category}
          id={category.toLowerCase().replace(" ", "-")}
          className="resource-section"
        >
          <h2>{category}</h2>
          {resources.map((resource) => (
            <ArticlePreview
              key={resource._id}
              title={resource.title}
              excerpt={resource.excerpt}
              link={resource.link}
            />
          ))}
        </section>
      ))}

      <Footer />
    </div>
  );
};

export default ResourcesPage;
