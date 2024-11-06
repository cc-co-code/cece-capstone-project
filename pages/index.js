import React from "react";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import WelcomeText from "@/src/components/WelcomeText";

const LandingPage = () => {
  return (
    <div className="page-container">
      <Header />
      <main className="content">
        <WelcomeText />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
