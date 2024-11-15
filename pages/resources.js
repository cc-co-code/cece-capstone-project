import React from "react";
import ArticlePreview from "@/src/components/ArticlePreview";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";

const ResourcesPage = () => {
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

      <section id="legal" className="resource-section">
        <h2>Legal and Medical</h2>
        <ArticlePreview
          title="Understanding Abortion Rights"
          excerpt="A deep dive into abortion rights..."
          link="https://example.com/article1"
        />
        <ArticlePreview
          title="Your Rights Explained"
          excerpt="Learn about the legal aspects of abortion in Germany..."
          link="https://example.com/article2"
        />
      </section>

      <section id="psychological" className="resource-section">
        <h2>Psychological Support</h2>
        <ArticlePreview
          title="Coping After Abortion"
          excerpt="Explore emotional support options..."
          link="https://example.com/article3"
        />
        <ArticlePreview
          title="Mental Health Resources"
          excerpt="Find counseling services and mental health guides..."
          link="https://example.com/article4"
        />
      </section>

      <section id="support" className="resource-section">
        <h2>Support Services</h2>
        <ArticlePreview
          title="Counseling Services Near You"
          excerpt="Find trusted counseling centers..."
          link="https://example.com/article5"
        />
        <ArticlePreview
          title="Practical Tips for Support"
          excerpt="Learn how to access local resources and help..."
          link="https://example.com/article6"
        />
      </section>
      <Footer />
    </div>
  );
};

export default ResourcesPage;
