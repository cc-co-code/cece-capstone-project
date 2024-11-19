import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import ArticlePreview from "@/src/components/ArticlePreview";

const categoryIntros = {
  "Legal Aspects":
    "Learn about the legal framework and rights surrounding abortion in different regions.",
  "Medical Information":
    "Find reliable medical information about procedures, safety, and aftercare.",
  "Psychological Support":
    "Access resources to help with emotional and mental health during this time.",
  "Support Services":
    "Explore organizations offering support and guidance tailored to your needs.",
  "Educational Information":
    "Discover detailed guides, FAQs, and educational materials related to abortion.",
};

const ResourcesPage = () => {
  const [resources, setResources] = useState([]);
  const router = useRouter();
  const { category } = router.query;
  const [activeCategory, setActiveCategory] = useState("");

  useEffect(() => {
    if (category) {
      setActiveCategory(decodeURIComponent(category));
    }
  }, [category]);

  useEffect(() => {
    fetch("/api/resources")
      .then((response) => response.json())
      .then((data) => setResources(data))
      .catch((error) => console.error("Error when loading resources:", error));
  }, []);

  const groupedResources = resources.reduce((acc, resource) => {
    const { category } = resource;
    if (!acc[category]) acc[category] = [];
    acc[category].push(resource);
    return acc;
  }, {});

  const sortedCategories = [
    "Legal Aspects",
    "Medical Information",
    "Psychological Support",
    "Support Services",
    "Educational Information",
  ];

  useEffect(() => {
    if (category && resources.length > 0) {
      const section = document.getElementById(
        category.toLowerCase().replace(" ", "-")
      );
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [category, resources]);

  return (
    <div className="page-container">
      <h2>Resources & Articles</h2>
      <p className="info-section">
        Welcome to the Resources Section. Here you can browse through curated
        links and external websites to find reliable information, support
        services, and helpful tools related to abortion. Explore the categories
        below to discover resources tailored to your needs.
      </p>

      <div className="resources-container">
        {sortedCategories.map((categoryName) => {
          const resources = groupedResources[categoryName];
          if (!resources) return null;

          return (
            <section
              key={categoryName}
              id={categoryName.toLowerCase().replace(" ", "-")}
              className={`resource-section ${
                activeCategory === categoryName ? "highlight" : ""
              }`}
            >
              <h2>{categoryName}</h2>
              <p className="category-intro">{categoryIntros[categoryName]}</p>
              {resources.map((resource) => (
                <ArticlePreview
                  key={resource._id}
                  title={resource.title}
                  excerpt={resource.excerpt}
                  link={resource.link}
                />
              ))}
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default ResourcesPage;
