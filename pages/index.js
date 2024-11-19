import React from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import ArticlePreview from "@/src/components/ArticlePreview";
import WelcomeText from "@/src/components/WelcomeText";

const LandingPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleCategoryClick = (category) => {
    router.push(`/resources?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="page-container">
      <main className="content">
        <WelcomeText />
        <section className="categories-section">
          <h2>Explore Resources</h2>
          <div className="categories-container">
            <div
              className="category-card"
              onClick={() => handleCategoryClick("Legal Aspects")}
            >
              <h3>Legal Aspects</h3>
              <ArticlePreview
                title="Understanding Abortion Rights"
                excerpt="A deep dive into abortion rights..."
                anchor="/resources#legal"
                category="Legal Aspects"
              />
            </div>

            <div
              className="category-card"
              onClick={() => handleCategoryClick("Medical Information")}
            >
              <h3>Medical Information</h3>
              <ArticlePreview
                title="Understanding Medical Procedures"
                excerpt="Learn about medical procedures and healthcare options related to abortion..."
                anchor="/resources#medical"
                category="Medical Information"
              />
            </div>

            <div
              className="category-card"
              onClick={() => handleCategoryClick("Psychological Support")}
            >
              <h3>Psychological Support</h3>
              <ArticlePreview
                title="Coping After Abortion"
                excerpt="Explore emotional support options..."
                anchor="/resources#psychological"
                category="Psychological Support"
              />
            </div>

            <div
              className="category-card"
              onClick={() => handleCategoryClick("Support Services")}
            >
              <h3>Support Services</h3>
              <ArticlePreview
                title="Counseling Services Near You"
                excerpt="Find trusted counseling centers..."
                anchor="/resources#support"
                category="Support Services"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
