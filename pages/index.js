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
  };

  const handleCommunityClick = () => {
    console.log("Button clicked, checking status...");

    if (status === "loading") {
      console.log("Authentication status is loading...");
      return;
    }

    if (status === "authenticated") {
      console.log("User is authenticated, navigating to /community");
      router.push("/community");
    } else {
      console.log("User not authenticated, redirecting to sign-in page");
      signIn();
    }
  };

  return (
    <div className="page-container">
      <Header />
      <main className="content">
        <WelcomeText />
        <div className="button-container">
          <Button
            text="Resources & Articles"
            onClick={() => router.push("/resources")}
          />
          <Button
            text="Community Stories"
            onClick={() => signIn({ callbackUrl: "/community" })}
          />
        </div>
        <section className="articles">
          <ArticlePreview
            title="Understanding Abortion Rights"
            excerpt="A deep dive into abortion rights, covering the current status and challenges..."
            link="https://example.com/article1"
          />
          <ArticlePreview
            title="Mental Health After Abortion"
            excerpt="An overview of mental health aspects and support systems available for women post-abortion..."
            link="https://example.com/article2"
          />
          {/* Weitere Artikel können hier hinzugefügt werden */}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
