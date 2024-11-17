import React from "react";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import WelcomeText from "@/src/components/WelcomeText";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import Button from "@/src/components/Button";
import ArticlePreview from "@/src/components/ArticlePreview";

const LandingPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleResourcesClick = () => {
    console.log("Navigate to Resources & Articles");
    router.push("/resources");
  };

  const handleCommunityClick = () => {
    console.log("Button clicked, checking status...");

    if (status === "loading") {
      console.log("Authentication status is loading...");
      return;
    }

    if (status === "authenticated") {
      console.log("User is authenticated, navigating to /community-stories");
      router.push("/community-stories");
    } else {
      console.log("User not authenticated, redirecting to sign-in page");
      signIn({ callbackUrl: "/community-stories" });
    }
  };

  const handleCategoryClick = (category) => {
    router.push(`/resources?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="page-container">
      <Header />
      <main className="content">
        <WelcomeText />
        <div className="button-container">
          <Button text="Resources & Articles" onClick={handleResourcesClick} />
          <Button text="Community Stories" onClick={handleCommunityClick} />
        </div>
        <section className="categories-section">
          <h2>Explore Resources</h2>
          <div className="categories-container">
            {/* Legal Aspects */}
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

            {/* Medical Information */}
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

            {/* Psychological Support */}
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

            {/* Support Services */}
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
      <Footer />
    </div>
  );
};

export default LandingPage;
