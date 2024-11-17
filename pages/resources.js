import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import ArticlePreview from "@/src/components/ArticlePreview";

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
      <Header />
      <h1>Resources & Articles</h1>
      <p className="welcome-text">
        Welcome to the Resources Section. Here you can browse through curated
        links and external websites to find reliable information, support
        services, and helpful tools related to abortion. Explore the categories
        below to discover resources tailored to your needs.
      </p>

      {sortedCategories.map((categoryName) => {
        const resources = groupedResources[categoryName];
        if (!resources) return null; // Überspringe Kategorien ohne Ressourcen

        if (categoryName === "Educational Information") {
          return (
            <div key={categoryName}>
              <h3 className="more-resources-heading">
                More Resources & Articles
              </h3>
              <section
                id={categoryName.toLowerCase().replace(" ", "-")}
                className={`resource-section ${
                  activeCategory === categoryName ? "highlight" : ""
                }`}
              >
                <h2>{categoryName}</h2>
                {resources.map((resource) => (
                  <ArticlePreview
                    key={resource._id}
                    title={resource.title}
                    excerpt={resource.excerpt}
                    link={resource.link}
                  />
                ))}
              </section>
            </div>
          );
        }

        return (
          <section
            key={categoryName}
            id={categoryName.toLowerCase().replace(" ", "-")}
            className={`resource-section ${
              activeCategory === categoryName ? "highlight" : ""
            }`}
          >
            <h2>{categoryName}</h2>
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

      <Footer />
    </div>
  );
};

export default ResourcesPage;
