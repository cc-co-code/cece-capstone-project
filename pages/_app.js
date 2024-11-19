import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <div className="page-container">
        <Header />
        <main className="content">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </SessionProvider>
  );
}
